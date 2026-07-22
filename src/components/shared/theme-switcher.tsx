"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { IconButton } from "@/components/ui/icon-button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTheme, type ThemeMode } from "@/providers/theme-provider";

const themeOptions: Array<{
  label: string;
  value: ThemeMode;
  icon: typeof Sun;
}> = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
];

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const CurrentIcon = themeOptions.find((option) => option.value === theme)?.icon ?? Monitor;

  return (
    <div className="relative">
      <Tooltip label="Change theme">
        <IconButton
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="Change theme"
          icon={<CurrentIcon aria-hidden="true" size={18} />}
          onClick={() => setIsOpen((open) => !open)}
        />
      </Tooltip>
      {isOpen ? (
        <div
          className="absolute right-0 top-12 z-50 w-44 rounded-xl border border-border-strong bg-surface-elevated p-1.5 shadow-xl"
          role="menu"
        >
          {themeOptions.map((option) => (
            <button
              aria-checked={theme === option.value}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-muted-foreground transition hover:bg-surface-muted hover:text-foreground",
                theme === option.value ? "bg-surface-muted text-foreground" : null,
              )}
              key={option.value}
              onClick={() => {
                setTheme(option.value);
                setIsOpen(false);
              }}
              role="menuitemradio"
              type="button"
            >
              <option.icon aria-hidden="true" size={17} />
              <span className="flex-1">{option.label}</span>
              {theme === option.value ? <Check aria-hidden="true" size={16} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
