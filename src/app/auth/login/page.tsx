
import { AuthCard } from "@/components/auth/authCard";
import { LoginForm } from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
      <AuthCard
        className="w-full max-w-sm"
        cardTitle="Login"
        cardDescription="Entre com suas credenciais para acessar o painel."
        footer={<p className="text-sm text-center text-gray-500">
          Não tem uma conta?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>}
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}