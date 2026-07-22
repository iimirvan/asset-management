import type { ThemeMode } from "@/providers/theme-provider";

export const themeStorageKey = "ams-theme";

export const themeModes: ThemeMode[] = ["light", "dark", "system"];

export const semanticThemeTokens = [
  "background",
  "foreground",
  "surface",
  "surface-elevated",
  "surface-muted",
  "border",
  "border-strong",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;
