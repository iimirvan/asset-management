import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextInput({ className, error, id, label, ...props }: TextInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground" htmlFor={id}>
        {label}
      </label>
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm transition placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
          error ? "border-danger" : null,
          className,
        )}
        id={id}
        {...props}
      />
      {error ? (
        <p className="text-sm font-medium text-danger" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
