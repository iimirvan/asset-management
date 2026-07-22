"use client";

import { ArrowRight, Command, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { IconButton } from "@/components/ui/icon-button";
import { navigationItems } from "@/constants/navigation";
import { useSessionStore } from "@/stores/session-store";

export function CommandSearch() {
  const router = useRouter();
  const user = useSessionStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = navigationItems.filter(
    (item) =>
      user?.role &&
      item.roles.includes(user.role) &&
      item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function navigate(href: string) {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        className="hidden h-10 min-w-56 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition hover:border-border-strong hover:bg-surface-muted md:flex"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Search aria-hidden="true" size={16} />
        <span className="flex-1 text-left">Search navigation</span>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-border-strong bg-surface px-1.5 py-0.5 text-[10px] font-semibold">
          <Command aria-hidden="true" size={10} />K
        </kbd>
      </button>
      <IconButton
        aria-label="Open command search"
        className="md:hidden"
        icon={<Search aria-hidden="true" size={18} />}
        onClick={() => setIsOpen(true)}
      />
      {isOpen ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-background/80 px-4 pt-[12vh] backdrop-blur-sm">
          <button
            aria-label="Close command search"
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <section
            aria-label="Command search"
            aria-modal="true"
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border-strong bg-surface-elevated shadow-xl"
            role="dialog"
          >
            <div className="flex h-14 items-center gap-3 border-b border-border px-4">
              <Search aria-hidden="true" className="text-muted-foreground" size={19} />
              <input
                autoFocus
                className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Go to a page..."
                value={query}
              />
              <IconButton
                aria-label="Close command search"
                className="size-8 border-transparent bg-transparent"
                icon={<X aria-hidden="true" size={16} />}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {items.length ? (
                items.map((item) => (
                  <button
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-surface-muted"
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    type="button"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-info-muted text-info">
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    <span className="text-xs font-medium text-muted-foreground">{item.href}</span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-8 text-center text-sm font-medium text-muted-foreground">
                  No matching navigation found.
                </p>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
