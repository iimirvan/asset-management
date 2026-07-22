import { Footer } from "@/components/layouts/footer";
import { Header } from "@/components/layouts/header";
import { Sidebar } from "@/components/layouts/sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-[calc(100vh-4rem)] flex-1 px-4 py-5 sm:px-6 sm:py-6 xl:px-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
