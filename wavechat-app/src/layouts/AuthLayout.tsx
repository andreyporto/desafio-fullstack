import { Outlet } from "react-router-dom";
import wavechatLogo from "../assets/wavechat_logo.png";

export default function AuthLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                <div className="flex flex-col items-center">
                    <img src={wavechatLogo} alt="WaveChat" className="h-36" />
                </div>
                <Outlet />
            </div>
        </div>
    );
}
