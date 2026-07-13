import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import type { Room, Message, PaginatedResponse } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useBroadcast } from "../hooks/useBroadcast";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import OnlineUsers from "../components/chat/OnlineUsers";
import Loading from "../components/Loading";

export default function Chat() {
    const { id } = useParams();
    const roomId = Number(id);
    const navigate = useNavigate();
    const { user } = useAuth();

    const [room, setRoom] = useState<Room | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [showOnline, setShowOnline] = useState(false);

    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const fetchRoom = async () => {
        try {
            const { data } = await api.get<Room>(`/rooms/${roomId}`);
            setRoom(data);
        } catch {
            toast.error("Sala não encontrada ou acesso negado.");
            navigate("/");
        }
    };

    const fetchMessages = async (pageNum: number = 1, prepend = false) => {
        try {
            const { data } = await api.get<PaginatedResponse<Message>>(
                `/rooms/${roomId}/messages`,
                { params: { page: pageNum } },
            );
            if (prepend) {
                setMessages((prev) => [...data.data.reverse(), ...prev]);
            } else {
                setMessages(data.data.reverse());
            }
            setLastPage(data.meta.last_page);
            setPage(data.meta.current_page);
        } catch {
            toast.error("Erro ao carregar mensagens.");
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoom();
        fetchMessages();
    }, [roomId]);

    const handleNewMessage = useCallback((message: Message) => {
        setMessages((prev) => {
            if (prev.some((m) => m.id === message.id)) {
                return prev;
            }
            return [...prev, message];
        });
    }, []);

    const handleTyping = useCallback(
        (data: { id: number; name: string }) => {
            if (data.id === user?.id) {
                return;
            }
            setTypingUser(data.name);
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(
                () => setTypingUser(null),
                3000,
            );
        },
        [user?.id],
    );

    const { onlineUsers, sendTyping } = useBroadcast({
        roomId,
        onMessage: handleNewMessage,
        onUserJoin: (u) => toast.info(`${u.name} entrou na sala`),
        onTyping: handleTyping,
    });

    const handleSend = async (body: string) => {
        try {
            await api.post(`/rooms/${roomId}/messages`, { body });
        } catch {
            toast.error("Erro ao enviar mensagem.");
        }
    };

    const handleLoadMore = () => {
        if (page < lastPage) {
            fetchMessages(page + 1, true);
        }
    };

    if (loading || !room) {
        return <Loading />;
    }

    return (
        <div className="flex h-screen flex-col">
            <ChatHeader
                room={room}
                onlineCount={onlineUsers.length}
                typingUser={typingUser}
                onBack={() => navigate("/")}
                onToggleOnline={() => setShowOnline(!showOnline)}
            />

            <div className="flex flex-1 overflow-hidden">
                <div className="flex flex-1 flex-col">
                    <MessageList
                        messages={messages}
                        currentUserId={user?.id ?? 0}
                        hasMore={page < lastPage}
                        onLoadMore={handleLoadMore}
                    />

                    <MessageInput onSend={handleSend} onTyping={sendTyping} />
                </div>

                {showOnline && (
                    <OnlineUsers
                        users={onlineUsers}
                        onClose={() => setShowOnline(false)}
                    />
                )}
            </div>
        </div>
    );
}
