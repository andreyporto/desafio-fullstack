import type { Room } from "../../types";

interface ChatHeaderProps {
  room: Room;
  onlineCount: number;
  typingUser: string | null;
  onBack: () => void;
  onToggleOnline: () => void;
}

export default function ChatHeader({ room, onlineCount, typingUser, onBack, onToggleOnline }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
      <button
        onClick={onBack}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex-1">
        <h2 className="text-base font-semibold text-gray-900">{room.name}</h2>
        {typingUser ? (
          <p className="text-xs text-primary">
            {typingUser} está digitando
            <span className="inline-flex w-5">
              <span className="animate-dot">.</span>
              <span className="animate-dot [animation-delay:150ms]">.</span>
              <span className="animate-dot [animation-delay:300ms]">.</span>
            </span>
          </p>
        ) : (
          <p className="text-xs text-gray-500">
            {room.description || "Sem descrição"}
            {room.members_count !== undefined && (
              <> · {room.members_count} {room.members_count === 1 ? "membro" : "membros"}</>
            )}
          </p>
        )}
      </div>

      <button
        onClick={onToggleOnline}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
        title="Usuários online"
      >
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span>{onlineCount}</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </div>
  );
}
