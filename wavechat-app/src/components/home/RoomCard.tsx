import type { Room } from "../../types";
import { formatRelativeTime } from "../../utils/format";

interface RoomCardProps {
    room: Room;
    isMember: boolean;
    onJoin: (id: number) => void;
    onLeave: (id: number) => void;
    onEnterChat: (id: number) => void;
}

export default function RoomCard({
    room,
    isMember,
    onJoin,
    onLeave,
    onEnterChat,
}: RoomCardProps) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    {room.name}
                </h3>
            </div>

            {room.description && (
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {room.description}
                </p>
            )}

            <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                    {room.members_count}{" "}
                    {room.members_count === 1 ? "membro" : "membros"}
                </span>
                <span className="text-xs text-gray-400">
                    {formatRelativeTime(room.created_at)}
                </span>
            </div>

            <div className="mt-4 flex gap-2">
                {isMember ? (
                    <>
                        <button
                            onClick={() => onEnterChat(room.id)}
                            className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark"
                        >
                            Entrar no chat
                        </button>
                        <button
                            onClick={() => onLeave(room.id)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onJoin(room.id)}
                        className="flex-1 rounded-lg border border-primary px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5"
                    >
                        Entrar na sala
                    </button>
                )}
            </div>
        </div>
    );
}
