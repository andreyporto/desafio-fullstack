import { getInitials, getAvatarColor } from "../../utils/avatar";

interface OnlineUsersProps {
  users: { id: number; name: string }[];
  onClose: () => void;
}

export default function OnlineUsers({ users, onClose }: OnlineUsersProps) {
  return (
    <div className="w-64 border-l border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Online ({users.length})
        </h3>
        <button
          onClick={onClose}
          className="rounded p-1 text-gray-400 hover:bg-gray-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-1 p-3">
        {users.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-400">
            Nenhum usuário online
          </p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ${getAvatarColor(user.name)}`}
              >
                {getInitials(user.name)}
              </div>
              <span className="truncate text-sm text-gray-700">{user.name}</span>
              <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
