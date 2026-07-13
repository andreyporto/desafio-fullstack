import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#CAF0F8] to-white px-4">
            <div className="flex flex-col items-center">
                <span className="text-sm font-semibold uppercase tracking-widest text-[#0077B6]">
                    WaveChat
                </span>

                <h1 className="mt-4 text-[10rem] leading-none font-black text-[#0077B6]">
                    404
                </h1>

                <div className="mt-2 h-1 w-16 rounded-full bg-[#00B4D8]" />

                <p className="mt-6 text-lg font-medium text-gray-700">
                    Página não encontrada
                </p>
                <p className="mt-1 max-w-xs text-center text-sm text-gray-400">
                    O que você procura pode ter sido movido ou não existe mais.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005f8c] hover:shadow-lg hover:shadow-[#0077B6]/20"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                    </svg>
                    Voltar ao início
                </Link>
            </div>
        </div>
    );
}
