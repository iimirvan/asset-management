import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
};

export function IconButton({ className, icon, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition duration-150 hover:border-border-strong hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px",
        className,
      )}
      type={type}
      {...props}
    >
      {icon}
    </button>
  );
}
