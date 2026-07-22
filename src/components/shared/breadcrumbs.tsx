"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  approvals: "Approvals",
  assets: "Assets",
  create: "Create",
  dashboard: "Dashboard",
  edit: "Edit",
  reports: "Reports",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1.5 text-sm">
        <li>
          <Link
            aria-label="Dashboard"
            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
            href="/dashboard"
          >
            <Home aria-hidden="true" size={15} />
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = labels[segment] ?? (segment.startsWith("asset-") ? "Detail" : segment);

          return (
            <li className="flex min-w-0 items-center gap-1.5" key={href}>
              <ChevronRight aria-hidden="true" className="shrink-0 text-border-strong" size={14} />
              {isLast ? (
                <span className="truncate font-semibold text-foreground">{label}</span>
              ) : (
                <Link
                  className="truncate font-medium text-muted-foreground transition hover:text-foreground"
                  href={href}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
