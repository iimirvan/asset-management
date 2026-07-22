"use client";

import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ className, type = "search", ...props }: SearchInputProps) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
        <Search aria-hidden="true" size={16} />
      </span>
      <input
        className={cn(
          "h-10 w-full rounded-lg border border-border-strong bg-background py-2 pl-10 pr-3 text-sm font-medium text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
          className,
        )}
        type={type}
        {...props}
      />
    </label>
  );
}
