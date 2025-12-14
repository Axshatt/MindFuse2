import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            message: input,
            emotion: "neutral",
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, backend is not responding right now.",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
      <h2 className="font-bold mb-2">MindFuse AI</h2>

      <div className="h-60 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border flex-1 p-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk to AI..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
