import { jsPDF } from "jspdf";
import OpenAI from "openai";
import { FileText } from "lucide-react";
import { EmotionData, Emotion } from "@/hooks/useEmotionDetector";
import { emotionConfig } from "@/lib/emotionConfig";
import { useState } from "react";

interface Props {
  emotionHistory: EmotionData[];
  currentEmotion?: EmotionData | null;
  isDisabled: boolean;
}

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

const ReportGenerator = ({ emotionHistory, currentEmotion, isDisabled }: Props) => {
  const [loading, setLoading] = useState(false);

  const generateDoctorReport = async () => {
    if (emotionHistory.length === 0) return;
    setLoading(true);

    try {
      const emotionCounts: Record<Emotion, number> = {
        happy: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        disgusted: 0,
        surprised: 0,
        neutral: 0,
      };

      emotionHistory.forEach(e => emotionCounts[e.emotion]++);
      const total = emotionHistory.length;

      const emotionPercentages = Object.entries(emotionCounts)
        .filter(([, v]) => v > 0)
        .map(([k, v]) => `${emotionConfig[k as Emotion].label}: ${Math.round((v / total) * 100)}%`)
        .join("\n");

      const prompt = `
You are a professional emotional wellbeing analysis AI.

Write a structured clinical-style report using bullet points only.

Rules:
- No diagnosis
- No medical claims
- Neutral, professional tone
- Clear headings
- Bullet points only
- No markdown

Context:
Emotion percentages:
${emotionPercentages}

Current emotion:
${currentEmotion?.emotion ?? "unknown"}

Provide:
1. Clinician Insights
2. Emotional Trends
3. Risk Indicators (if any)
4. Recommendations
5. User-Friendly Summary
6. Positive Closing Note
`;

      const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      });

      const aiText = response.choices[0].message.content || "";

      /* ---------------- PDF GENERATION ---------------- */

      const doc = new jsPDF();

      // ===== PAGE 1 =====
      doc.setFontSize(20);
      doc.text("MindFuse – Clinical Emotion Report", 20, 25);

      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 35);

      // Judge Summary Box
      doc.setDrawColor(0);
      doc.rect(20, 42, 170, 28);
      doc.setFontSize(11);
      doc.text("Judge Summary", 25, 50);
      doc.setFontSize(9);
      doc.text(
        "• Multimodal AI (Vision + Language)\n• Real-time emotion tracking\n• Ethical mental wellbeing support\n• No diagnosis, supportive guidance only",
        25,
        56
      );

      // Emotion Percentages
      doc.setFontSize(14);
      doc.text("Emotion Distribution", 20, 80);
      doc.setFontSize(10);

      let y = 90;
      Object.entries(emotionCounts).forEach(([e, c]) => {
        if (c > 0) {
          doc.text(
            `• ${emotionConfig[e as Emotion].label}: ${Math.round((c / total) * 100)}%`,
            25,
            y
          );
          y += 7;
        }
      });

      // AI Analysis
      doc.setFontSize(14);
      doc.text("AI Analysis", 20, y + 10);
      doc.setFontSize(10);

      const lines = doc.splitTextToSize(aiText, 170);
      doc.text(lines, 20, y + 20);

      // ===== PAGE 2 – SIMPLE BAR CHART =====
      doc.addPage();
      doc.setFontSize(16);
      doc.text("Emotion Frequency Chart", 20, 25);

      let chartY = 50;
      const barMaxWidth = 120;

      Object.entries(emotionCounts).forEach(([emotion, count]) => {
        if (count === 0) return;
        const barWidth = (count / total) * barMaxWidth;

        doc.setFontSize(9);
        doc.text(emotionConfig[emotion as Emotion].label, 20, chartY);
        doc.rect(60, chartY - 5, barWidth, 5);
        doc.text(`${count}`, 65 + barWidth, chartY);
        chartY += 10;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text("MindFuse – AI Powered Emotional Intelligence", 20, 285);

      doc.save(`mindfuse-clinical-report-${Date.now()}.pdf`);
    } catch (err) {
      console.error("Doctor report generation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generateDoctorReport}
      disabled={isDisabled || loading}
      className="btn-secondary w-full justify-center disabled:opacity-50"
    >
      <FileText className="w-4 h-4" />
      {loading ? "Generating Doctor Report..." : "Generate Doctor Report (PDF)"}
    </button>
  );
};

export default ReportGenerator;
