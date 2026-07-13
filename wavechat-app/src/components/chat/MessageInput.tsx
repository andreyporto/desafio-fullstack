import { useState, type FormEvent } from "react";

interface MessageInputProps {
  onSend: (body: string) => void;
  onTyping: () => void;
}

export default function MessageInput({ onSend, onTyping }: MessageInputProps) {
  const [body, setBody] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setBody("");
  };

  const handleChange = (value: string) => {
    setBody(value);
    onTyping();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-gray-200 bg-white px-6 py-3"
    >
      <input
        type="text"
        value={body}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Digite sua mensagem..."
        className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        disabled={!body.trim()}
        className="rounded-full bg-primary p-2.5 text-white hover:bg-primary-dark disabled:opacity-50"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </form>
  );
}
