"use client";

import {
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  Package,
  ShieldCheck,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconButton } from "@/components/ui/icon-button";
import { Tooltip } from "@/components/ui/tooltip";
import { navigationItems, type NavigationItem } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useSessionStore } from "@/stores/session-store";
import { useUiStore } from "@/stores/ui-store";

const navigationIcons: Record<NavigationItem["label"], LucideIcon> = {
  Approvals: BarChart3,
  Assets: Package,
  Dashboard: LayoutDashboard,
  Reports: FileText,
};

export function Sidebar() {
  const pathname = usePathname();
  const user = useSessionStore((state) => state.user);
  const sidebarMode = useUiStore((state) => state.sidebarMode);
  const isMobileSidebarOpen = useUiStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const visibleItems = navigationItems.filter((item) =>
    user ? item.roles.includes(user.role) : false,
  );
  const isCollapsed = sidebarMode === "collapsed";

  return (
    <>
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-border bg-surface transition-[width] duration-200 lg:flex lg:flex-col",
          isCollapsed ? "w-20" : "w-[280px]",
        )}
      >
        <SidebarBrand collapsed={isCollapsed} />
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNavigation collapsed={isCollapsed} items={visibleItems} pathname={pathname} />
        </div>
        <div className="border-t border-border p-3">
          <div
            className={cn(
              "flex items-center rounded-lg bg-success-muted text-success",
              isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2.5",
            )}
          >
            <ShieldCheck aria-hidden="true" className="shrink-0" size={17} />
            {isCollapsed ? null : (
              <div className="min-w-0">
                <p className="text-xs font-bold">Protected session</p>
                <p className="truncate text-[10px] font-semibold opacity-80">RBAC active</p>
              </div>
            )}
          </div>
        </div>
      </aside>
      {isMobileSidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
            type="button"
          />
          <aside className="relative flex h-full w-[min(20rem,88vw)] flex-col border-r border-border-strong bg-surface-elevated shadow-xl">
            <div className="flex h-16 items-center justify-between gap-3 border-b border-border px-4">
              <SidebarBrand compact />
              <IconButton
                aria-label="Close navigation"
                icon={<X aria-hidden="true" size={18} />}
                onClick={() => setMobileSidebarOpen(false)}
              />
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <SidebarNavigation
                items={visibleItems}
                onNavigate={() => setMobileSidebarOpen(false)}
                pathname={pathname}
              />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

type SidebarBrandProps = {
  collapsed?: boolean;
  compact?: boolean;
};

function SidebarBrand({ collapsed = false, compact = false }: SidebarBrandProps) {
  if (compact) {
    return (
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Boxes aria-hidden="true" size={19} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">Asset Management</p>
          <p className="truncate text-[10px] font-semibold uppercase text-muted-foreground">
            Operations Console
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex h-16 items-center border-b border-border", collapsed ? "justify-center px-3" : "gap-3 px-5")}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Boxes aria-hidden="true" size={19} />
      </span>
      {collapsed ? null : (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">Asset Management</p>
          <p className="truncate text-[10px] font-semibold uppercase text-muted-foreground">
            Operations Console
          </p>
        </div>
      )}
    </div>
  );
}

type SidebarNavigationProps = {
  items: NavigationItem[];
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
};

function SidebarNavigation({
  collapsed = false,
  items,
  onNavigate,
  pathname,
}: SidebarNavigationProps) {
  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {collapsed ? null : (
        <p className="mb-2 px-3 text-[10px] font-bold uppercase text-muted-foreground">
          Workspace
        </p>
      )}
      {items.map((item) => {
        const Icon = navigationIcons[item.label];
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const link = (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex h-11 items-center rounded-lg text-sm font-semibold text-muted-foreground transition duration-150 hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary",
              collapsed ? "justify-center px-2" : "gap-3 px-3",
              isActive ? "bg-info-muted text-info" : null,
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            {isActive ? (
              <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary" />
            ) : null}
            <Icon aria-hidden="true" className="shrink-0" size={18} />
            {collapsed ? null : <span>{item.label}</span>}
          </Link>
        );

        return collapsed ? (
          <Tooltip key={item.href} label={item.label}>
            {link}
          </Tooltip>
        ) : (
          link
        );
      })}
    </nav>
  );
}
