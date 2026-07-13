import { AuthProvider } from "./hooks/useAuth";
import ToastProvider from "./components/ui/ToastProvider";
import AppRoutes from "./routes";

export default function App() {
  return (
    <>
      <ToastProvider />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}
