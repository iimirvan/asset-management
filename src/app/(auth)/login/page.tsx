import { Boxes, ShieldCheck } from "lucide-react";

import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-5 sm:px-6">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Boxes aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">Asset Management</p>
            <p className="text-[10px] font-bold uppercase text-muted-foreground">
              Operations Console
            </p>
          </div>
        </div>
        <ThemeSwitcher />
      </header>
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center py-10">
        <section className="w-full max-w-md rounded-[var(--radius-card)] border border-border-strong bg-surface-elevated p-6 shadow-xl sm:p-8">
          <div className="mb-7">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success-muted px-3 py-1 text-xs font-bold text-success">
              <ShieldCheck aria-hidden="true" size={14} />
              Secure access
            </span>
            <h1 className="text-2xl font-bold tracking-normal text-foreground">
              Asset Management System
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
              Sign in to your operational workspace.
            </p>
          </div>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
