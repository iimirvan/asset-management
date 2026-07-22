import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-semibold transition duration-150 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover" : null,
        variant === "secondary"
          ? "border border-border-strong bg-surface text-foreground hover:bg-surface-muted"
          : null,
        variant === "danger" ? "bg-danger text-white shadow-sm hover:opacity-90" : null,
        variant === "ghost" ? "bg-transparent text-foreground hover:bg-surface-muted" : null,
        className,
      )}
      type={type}
      {...props}
    />
  );
}
