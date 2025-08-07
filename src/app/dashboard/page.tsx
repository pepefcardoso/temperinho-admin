import { getSession, logout } from "@/lib/auth";

function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        Sair
      </button>
    </form>
  );
}

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard!</h1>
        <p className="mt-2">
          Olá, <span className="font-semibold">{session?.user.name}</span>!
        </p>
        <p className="mt-1">
          Seu email é:{" "}
          <span className="font-semibold">{session?.user.email}</span>
        </p>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}