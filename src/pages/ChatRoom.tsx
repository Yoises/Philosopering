import { useState } from "react";

interface ChatRoomProps {
  philosopher: string;
  onBack: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatRoom = ({ philosopher, onBack }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Welcome. I am ${philosopher}. Ask me anything about my philosophy.`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Añadir mensaje del usuario
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");

    // Llamar a la IA
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // o el modelo que tengas disponible
          messages: [
            {
              role: "system",
              content: `You are ${philosopher}, speaking with the tone, vocabulary, and reasoning typical of their philosophy.`,
            },
            ...newMessages,
          ],
        }),
      });

      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || "…";

      setMessages([...newMessages, { role: "assistant" as const, content: aiMessage }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ I couldn't respond right now." },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#fdfaf6] relative">
      {/* Título */}
      <header className="text-center py-6 border-b border-gray-300">
        <h1 className="text-2xl font-serif font-semibold tracking-tight">
          Chatting with <br />
          {philosopher}
        </h1>
      </header>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.role === "user"
                ? "ml-auto bg-[#C04E33] text-white"
                : "mr-auto bg-[#e8e3df] text-gray-800"
              }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center border-t border-gray-300 p-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-4 bg-[#C04E33] text-white px-4 py-2 rounded-lg hover:bg-[#a9442c] transition"
        >
          Send
        </button>
        {/* Botón volver */}
        <button
          onClick={onBack}
          className="ml-4 px-4 py-2 border-2 border-[#C04E33] text-[#C04E33] rounded-full hover:bg-[#C04E33] hover:text-white transition"
        >
          Back
        </button>
      </div>



    </div>
  );
};
console.log("ENV key:", import.meta.env.VITE_OPENAI_API_KEY);
export default ChatRoom;
