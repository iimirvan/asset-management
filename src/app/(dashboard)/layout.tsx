import { AppShell } from "@/components/layouts/app-shell";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}
