"use client";

import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CommandSearch } from "@/components/shared/command-search";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { UserMenu } from "@/components/shared/user-menu";
import { IconButton } from "@/components/ui/icon-button";
import { Tooltip } from "@/components/ui/tooltip";
import { useUiStore } from "@/stores/ui-store";

export function Header() {
  const sidebarMode = useUiStore((state) => state.sidebarMode);
  const setSidebarMode = useUiStore((state) => state.setSidebarMode);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-xl">
      <div className="flex h-16 w-full items-center gap-2 px-3 sm:px-5 lg:px-6">
        <IconButton
          aria-label="Open navigation"
          className="lg:hidden"
          icon={<Menu aria-hidden="true" size={19} />}
          onClick={() => setMobileSidebarOpen(true)}
        />
        <Tooltip label={sidebarMode === "expanded" ? "Collapse sidebar" : "Expand sidebar"}>
          <IconButton
            aria-label={sidebarMode === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
            className="hidden lg:inline-flex"
            icon={
              sidebarMode === "expanded" ? (
                <PanelLeftClose aria-hidden="true" size={18} />
              ) : (
                <PanelLeftOpen aria-hidden="true" size={18} />
              )
            }
            onClick={() =>
              setSidebarMode(sidebarMode === "expanded" ? "collapsed" : "expanded")
            }
          />
        </Tooltip>
        <div className="min-w-0 flex-1">
          <div className="sm:hidden">
            <p className="truncate text-sm font-bold text-foreground">Asset Management</p>
          </div>
          <div className="hidden sm:block">
            <Breadcrumbs />
          </div>
        </div>
        <CommandSearch />
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </header>
  );
}
