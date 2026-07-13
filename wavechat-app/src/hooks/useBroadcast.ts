import { useEffect, useRef, useCallback, useState } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import type { PresenceChannel } from "laravel-echo";
import type { Message } from "../types";

window.Pusher = Pusher;

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<"reverb">;
    }
}

export function createEcho(): Echo<"reverb"> {
    if (window.Echo) {
        return window.Echo;
    }

    window.Echo = new Echo<"reverb">({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY ?? "local",
        wsHost: import.meta.env.VITE_REVERB_HOST ?? "localhost",
        wsPort: Number(import.meta.env.VITE_REVERB_PORT) ?? 8080,
        wssPort: Number(import.meta.env.VITE_REVERB_PORT) ?? 8080,
        forceTLS: false,
        enabledTransports: ["ws"],
        auth: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token") ?? ""}`,
            },
        },
    });

    return window.Echo;
}

interface UseBroadcastOptions {
    roomId: number;
    onMessage?: (message: Message) => void;
    onUserJoin?: (user: { id: number; name: string }) => void;
    onUserLeave?: (user: { id: number; name: string }) => void;
    onTyping?: (user: { id: number; name: string }) => void;
}

export function useBroadcast({
    roomId,
    onMessage,
    onUserJoin,
    onUserLeave,
    onTyping,
}: UseBroadcastOptions) {
    const channelRef = useRef<PresenceChannel | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<
        { id: number; name: string }[]
    >([]);

    const onUserJoinRef = useRef(onUserJoin);
    const onUserLeaveRef = useRef(onUserLeave);
    const onMessageRef = useRef(onMessage);
    const onTypingRef = useRef(onTyping);
    const joinedIdsRef = useRef(new Set<number>());

    onUserJoinRef.current = onUserJoin;
    onUserLeaveRef.current = onUserLeave;
    onMessageRef.current = onMessage;
    onTypingRef.current = onTyping;

    useEffect(() => {
        const echo = createEcho();
        const channelName = `room.${roomId}`;
        const channel = echo.join(channelName) as unknown as PresenceChannel;
        channelRef.current = channel;
        joinedIdsRef.current = new Set();

        channel.here((users: { id: number; name: string }[]) => {
            setOnlineUsers(users);
        });

        channel.joining((user: { id: number; name: string }) => {
            setOnlineUsers((prev) => {
                if (prev.some((u) => u.id === user.id)) {
                    return prev;
                }
                return [...prev, user];
            });
            if (!joinedIdsRef.current.has(user.id)) {
                joinedIdsRef.current.add(user.id);
                onUserJoinRef.current?.(user);
            }
        });

        channel.leaving((user: { id: number; name: string }) => {
            setOnlineUsers((prev) => prev.filter((u) => u.id !== user.id));
            onUserLeaveRef.current?.(user);
        });

        channel.listen(".message.sent", (data: Message) => {
            onMessageRef.current?.(data);
        });

        channel.listenForWhisper(
            "typing",
            (data: { id: number; name: string }) => {
                onTypingRef.current?.(data);
            },
        );

        return () => {
            echo.leave(channelName);
            channelRef.current = null;
        };
    }, [roomId]);

    const sendTyping = useCallback(() => {
        if (channelRef.current) {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                channelRef.current.whisper("typing", {
                    id: user.id,
                    name: user.name,
                });
            }
        }
    }, []);

    return { onlineUsers, sendTyping };
}
