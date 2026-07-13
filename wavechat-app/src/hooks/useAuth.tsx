import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import { toast } from "sonner";
import type { User } from "../types";
import api from "../api/axios";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("user");
        if (!stored || stored === "undefined") {
            return null;
        }
        return JSON.parse(stored);
    });

    const [token, setToken] = useState<string | null>(() => {
        const stored = localStorage.getItem("access_token");
        return stored && stored !== "undefined" ? stored : null;
    });

    const login = useCallback(async (email: string, password: string) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.access_token);
        setUser(data.user);
    }, []);

    const register = useCallback(
        async (name: string, email: string, password: string) => {
            await api.post("/auth/register", { name, email, password });
        },
        [],
    );

    const logout = useCallback(async () => {
        try {
            await api.post("/auth/logout");
        } catch {
            toast.error("Erro ao encerrar sessão.");
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}
