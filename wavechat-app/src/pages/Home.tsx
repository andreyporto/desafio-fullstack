import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import type { Room, PaginatedResponse } from "../types";
import { useAuth } from "../hooks/useAuth";
import RoomCard from "../components/home/RoomCard";
import CreateRoomModal from "../components/home/CreateRoomModal";
import Loading from "../components/Loading";

export default function Home() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [memberRoomIds, setMemberRoomIds] = useState<Set<number>>(new Set());
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();

    const fetchRooms = async (pageNum: number = 1) => {
        setLoading(true);
        try {
            const { data } = await api.get<PaginatedResponse<Room>>("/rooms", {
                params: { page: pageNum },
            });
            setRooms(data.data);
            setLastPage(data.meta.last_page);
            setPage(data.meta.current_page);

            const ids = new Set<number>();
            for (const room of data.data) {
                try {
                    const { data: detail } = await api.get(`/rooms/${room.id}`);
                    if (
                        detail.members?.some(
                            (m: { id: number }) => m.id === user?.id,
                        )
                    ) {
                        ids.add(room.id);
                    }
                } catch {}
            }
            setMemberRoomIds(ids);
        } catch {
            toast.error("Erro ao carregar salas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleJoin = async (roomId: number) => {
        try {
            await api.post(`/rooms/${roomId}/join`);
            setMemberRoomIds((prev) => new Set(prev).add(roomId));
            navigate(`/chat/${roomId}`);
        } catch {
            toast.error("Erro ao entrar na sala.");
        }
    };

    const handleLeave = async (roomId: number) => {
        try {
            await api.post(`/rooms/${roomId}/leave`);
            setMemberRoomIds((prev) => {
                const next = new Set(prev);
                next.delete(roomId);
                return next;
            });
            setRooms((prev) =>
                prev.map((r) =>
                    r.id === roomId
                        ? {
                              ...r,
                              members_count: Math.max(0, r.members_count - 1),
                          }
                        : r,
                ),
            );
            toast.success("Você saiu da sala.");
        } catch {
            toast.error("Erro ao sair da sala.");
        }
    };

    const handleRoomCreated = () => {
        setShowCreateModal(false);
        fetchRooms(1);
    };

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-[12px]">
                <h1 className="text-lg font-bold text-gray-900">Salas</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                    Criar sala
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
                {loading ? (
                    <Loading />
                ) : rooms.length === 0 ? (
                    <div className="py-20 text-center text-gray-500">
                        Nenhuma sala encontrada. Crie a primeira!
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                isMember={memberRoomIds.has(room.id)}
                                onJoin={handleJoin}
                                onLeave={handleLeave}
                                onEnterChat={(id) => navigate(`/chat/${id}`)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {lastPage > 1 && (
                <div className="flex items-center justify-center gap-3 border-t border-gray-200 bg-white px-8 py-3">
                    <button
                        onClick={() => fetchRooms(page - 1)}
                        disabled={page <= 1}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="text-sm font-medium text-gray-500">
                        {page} / {lastPage}
                    </span>
                    <button
                        onClick={() => fetchRooms(page + 1)}
                        disabled={page >= lastPage}
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            )}

            {showCreateModal && (
                <CreateRoomModal
                    onClose={() => setShowCreateModal(false)}
                    onCreated={handleRoomCreated}
                />
            )}
        </div>
    );
}
