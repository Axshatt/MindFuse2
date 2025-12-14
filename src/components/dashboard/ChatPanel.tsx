import { useState } from "react";
import OpenAI from "openai";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { EmotionData } from "@/hooks/useEmotionDetector";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  emotionHistory: EmotionData[];
  currentEmotion?: EmotionData | null;
}

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY, // hackathon safe
  dangerouslyAllowBrowser: true,
});

const ChatPanel = ({ emotionHistory, currentEmotion }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const emotionContext = `
Recent detected emotions:
${emotionHistory.slice(-10).map(e => `- ${e.emotion}`).join("\n")}

Current emotion:
${currentEmotion?.emotion ?? "unknown"}
`;

    try {
      const response = await client.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: `
You are a calm, empathetic emotional support assistant.

Rules:
- Do NOT diagnose mental disorders
- Use supportive, reassuring language
- Reference detected emotions gently
- Encourage reflection and emotional awareness
- Keep responses concise and human

Emotion context:
${emotionContext}
`,
          },
          ...updatedMessages,
        ],
        temperature: 0.4,
      });

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: response.choices[0].message.content || "" },
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I'm here with you. Let’s take this one step at a time.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-xl p-4 border border-border flex flex-col h-[420px]"
    >
      <h3 className="text-lg font-semibold mb-2">🧠 Emotion-Aware Chat</h3>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">
            You can talk freely here. I’m listening.
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-3 py-2 rounded-lg text-sm max-w-[80%]
              ${msg.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-muted"}`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <p className="text-xs text-muted-foreground">Thinking…</p>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Share what’s on your mind…"
          className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm"
        />
        <button onClick={handleSend} className="btn-primary px-3">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatPanel;
