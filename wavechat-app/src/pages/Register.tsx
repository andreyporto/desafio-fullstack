import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import FormLabel from "../components/FormLabel";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await register(name, email, password);
            toast.success("Conta criada com sucesso! Faça login.");
            navigate("/login");
        } catch (err: any) {
            const data = err.response?.data;
            if (data?.errors) {
                const fieldErrors: Record<string, string> = {};
                for (const [key, msgs] of Object.entries<string[]>(
                    data.errors,
                )) {
                    fieldErrors[key] = msgs[0];
                }
                setErrors(fieldErrors);
            } else {
                toast.error(
                    data?.message ?? "Erro ao cadastrar. Tente novamente.",
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field: string) =>
        `w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            errors[field]
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-primary"
        }`;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-center text-xl font-semibold text-primary">
                Criar uma conta
            </h2>

            <div>
                <FormLabel label="Nome" required />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErrors((p) => ({ ...p, name: "" }));
                    }}
                    required
                    className={inputClass("name")}
                    placeholder="Seu nome"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
            </div>

            <div>
                <FormLabel label="Email" required />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((p) => ({ ...p, email: "" }));
                    }}
                    required
                    className={inputClass("email")}
                    placeholder="seu@email.com"
                />
                {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
            </div>

            <div>
                <FormLabel label="Senha" required />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((p) => ({ ...p, password: "" }));
                    }}
                    required
                    minLength={8}
                    className={inputClass("password")}
                    placeholder="Mínimo 8 caracteres"
                />
                {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
                {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            <p className="text-center text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                    to="/login"
                    className="font-medium text-primary hover:underline"
                >
                    Entrar
                </Link>
            </p>
        </form>
    );
}
