import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getInitials, getAvatarColor } from "../utils/avatar";

export default function AppLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen overflow-hidden bg-neutral">
            <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
                <div className="flex items-center justify-center border-b border-gray-200 px-5 py-[18px]">
                    <span className="text-lg font-bold text-primary">
                        WaveChat
                    </span>
                </div>

                <nav className="flex-1 p-4">
                    <button
                        onClick={() => navigate("/")}
                        className="w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-tertiary/30"
                    >
                        Salas
                    </button>
                </nav>

                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(user?.name ?? "")}`}
                        >
                            {getInitials(user?.name ?? "")}
                        </div>
                        <div className="flex-1 truncate">
                            <p className="truncate text-sm font-medium text-gray-900">
                                {user?.name}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        Sair
                    </button>
                </div>
            </aside>

            <main className="flex flex-1 flex-col overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
