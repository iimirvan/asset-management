"use client";

import { LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useSessionStore } from "@/stores/session-store";
import { useUiStore } from "@/stores/ui-store";

export function UserMenu() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const logout = useSessionStore((state) => state.logout);
  const user = useSessionStore((state) => state.user);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    queryClient.clear();
    setMobileSidebarOpen(false);
    logout();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-1.5 pr-2.5 text-left transition hover:border-border-strong hover:bg-surface-muted"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
          {initials}
        </span>
        <span className="hidden min-w-0 lg:block">
          <span className="block max-w-28 truncate text-xs font-semibold text-foreground">
            {user.name}
          </span>
          <span className="block text-[10px] font-semibold text-muted-foreground">
            {user.role}
          </span>
        </span>
      </button>
      {isOpen ? (
        <div
          className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-border-strong bg-surface-elevated p-2 shadow-xl"
          role="menu"
        >
          <div className="border-b border-border px-3 py-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                <p className="truncate text-xs font-medium text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-1 px-3 py-2 text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" size={15} />
              Role: {user.role}
            </span>
          </div>
          <button
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-danger transition hover:bg-danger-muted"
            onClick={handleLogout}
            role="menuitem"
            type="button"
          >
            <LogOut aria-hidden="true" size={17} />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
