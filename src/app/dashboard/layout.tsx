import { Sidebar } from "@/components/sidebar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserSessionProvider } from "@/components/auth/userSessionProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login?error=invalid_session");
  }

  return (
    <UserSessionProvider initialUser={session.user}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </UserSessionProvider>
  );
}