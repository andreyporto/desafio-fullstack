import { useEffect, useRef } from "react";
import type { Message } from "../../types";
import { getInitials, getAvatarColor } from "../../utils/avatar";
import { formatRelativeTime } from "../../utils/format";

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function MessageList({ messages, currentUserId, hasMore, onLoadMore }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-4">
      {hasMore && (
        <button
          onClick={onLoadMore}
          className="mx-auto mb-4 block rounded-lg border border-gray-200 px-4 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
        >
          Carregar mais
        </button>
      )}

      <div className="space-y-4">
        {messages.map((msg) => {
          const isOwn = msg.user.id === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(msg.user.name)}`}
              >
                {getInitials(msg.user.name)}
              </div>

              <div className={`max-w-xs ${isOwn ? "items-end" : ""}`}>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-medium text-gray-700">
                    {msg.user.name}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {formatRelativeTime(msg.created_at)}
                  </span>
                </div>
                <div
                  className={`mt-1 rounded-xl px-4 py-2 text-sm ${
                    isOwn
                      ? "rounded-tr-sm bg-primary text-white"
                      : "rounded-tl-sm bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
