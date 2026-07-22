import { ArrowLeft, Boxes } from "lucide-react";
import Link from "next/link";

import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
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
          <Link
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            href="/login"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to login
          </Link>
          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-normal text-foreground">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
              Submit your email to request password recovery.
            </p>
          </div>
          <ForgotPasswordForm />
        </section>
      </div>
    </main>
  );
}
