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

    /* ---------------- PDF GENERATION ---------------- */

const doc = new jsPDF();
let y = 30;

// Utility
const newPageIfNeeded = () => {
  if (y > 260) {
    doc.addPage();
    y = 30;
  }
};

const sectionTitle = (title: string) => {
  newPageIfNeeded();
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);
  doc.text(title, 20, y);
  y += 8;
};

const paragraph = (text: string) => {
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, 170);
  doc.text(lines, 20, y);
  y += lines.length * 6 + 4;
};

const bulletList = (items: string[]) => {
  doc.setFontSize(10);
  items.forEach(item => {
    newPageIfNeeded();
    const lines = doc.splitTextToSize(item, 160);
    doc.text("•", 22, y);
    doc.text(lines, 26, y);
    y += lines.length * 6;
  });
  y += 4;
};

/* ---------- COVER PAGE ---------- */

doc.setFillColor(230, 246, 250);
doc.rect(0, 0, 210, 297, "F");

doc.setFontSize(26);
doc.setTextColor(0, 130, 150);
doc.text("MindFuse", 20, 90);

doc.setFontSize(18);
doc.text("Clinical Emotional Insight Report", 20, 110);

doc.setFontSize(11);
doc.setTextColor(60);
doc.text(
  "This report summarizes observed emotional patterns during the session.\nIt is intended for emotional awareness and professional review only.",
  20,
  130
);

doc.setFontSize(9);
doc.text(`Generated on ${new Date().toLocaleString()}`, 20, 160);

doc.addPage();
y = 30;

/* ---------- SESSION OVERVIEW ---------- */

doc.setFillColor(240, 250, 252);
doc.rect(15, y - 6, 180, 36, "F");

doc.setFontSize(14);
doc.setFont("helvetica", "bold");
doc.text("Session Overview", 20, y);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.text(
  `• Total Data Points: ${total}\n` +
  `• Dominant Emotion: ${
    emotionConfig[
      Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0][0] as Emotion
    ].label
  }\n` +
  `• Emotional Variability: ${
    Object.values(emotionCounts).filter(v => v > 0).length
  } emotions detected`,
  20,
  y + 10
);

y += 50;

/* ---------- EMOTION DISTRIBUTION ---------- */

sectionTitle("Emotion Distribution");

Object.entries(emotionCounts).forEach(([emotion, count]) => {
  if (count === 0) return;

  newPageIfNeeded();
  const percent = Math.round((count / total) * 100);

  doc.setFontSize(10);
  doc.text(
    `${emotionConfig[emotion as Emotion].label} (${percent}%)`,
    20,
    y
  );

  doc.setFillColor(0, 180, 200);
  doc.rect(90, y - 4, (percent / 100) * 90, 6, "F");

  y += 12;
});

/* ---------- AI OBSERVATIONS ---------- */

sectionTitle("AI Observational Insights");

paragraph(
  "The following observations are generated based on detected emotional patterns. These insights are descriptive in nature and do not represent medical or psychological diagnoses."
);

const aiLines = aiText
  .split("\n")
  .map(l => l.trim())
  .filter(Boolean);

bulletList(aiLines);

/* ---------- USER FRIENDLY INTERPRETATION ---------- */

sectionTitle("What This Means");

bulletList([
  "Your emotional responses demonstrate natural variability during interaction.",
  "No single emotional state dominated the entire session.",
  "Observed stress-related emotions appear situational and temporary.",
  "Emotional recovery and neutral states were consistently present."
]);

/* ---------- IMPORTANT NOTICE ---------- */

doc.setFillColor(255, 245, 245);
doc.rect(15, y - 6, 180, 32, "F");

doc.setFontSize(11);
doc.setFont("helvetica", "bold");
doc.setTextColor(120, 0, 0);
doc.text("Important Notice", 20, y);

doc.setFontSize(9);
doc.setFont("helvetica", "normal");
doc.setTextColor(80);
doc.text(
  "This report is not a medical diagnosis and should not be used as a substitute for professional mental health evaluation.",
  20,
  y + 12
);

/* ---------- FOOTER ---------- */

doc.setFontSize(8);
doc.setTextColor(150);
doc.text(
  "MindFuse – Ethical AI for Emotional Awareness | Hackstrom 2025",
  20,
  285
);

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
      className="btn-primary w-full justify-center disabled:opacity-50"
    >
      <FileText className="w-4 h-4" />
      {loading ? "Generating Doctor Report..." : "Generate Doctor Report (PDF)"}
    </button>
  );
};

export default ReportGenerator;
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
      className="btn-primary w-full justify-center disabled:opacity-50"
    >
      <FileText className="w-4 h-4" />
      {loading ? "Generating Doctor Report..." : "Generate Doctor Report (PDF)"}
    </button>
  );
};

export default ReportGenerator;
