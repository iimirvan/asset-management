"use client";

import dynamic from "next/dynamic";
import { Suspense, type ComponentType } from "react";

import { LoadingState } from "@/components/shared/loading-state";
import type { DashboardData, DashboardWidgetDefinition } from "@/types/dashboard";
import type { Role } from "@/types/role";

const widgetComponents = {
  "asset-summary": dynamic(() =>
    import("@/features/dashboard/widgets/AssetSummaryWidget").then(
      (module) => module.AssetSummaryWidget,
    ),
  ),
  "asset-value": dynamic(() =>
    import("@/features/dashboard/widgets/AssetValueWidget").then(
      (module) => module.AssetValueWidget,
    ),
  ),
  "asset-distribution": dynamic(() =>
    import("@/features/dashboard/widgets/AssetDistributionWidget").then(
      (module) => module.AssetDistributionWidget,
    ),
  ),
  "recent-activity": dynamic(() =>
    import("@/features/dashboard/widgets/RecentActivityWidget").then(
      (module) => module.RecentActivityWidget,
    ),
  ),
  "pending-approval": dynamic(() =>
    import("@/features/dashboard/widgets/PendingApprovalWidget").then(
      (module) => module.PendingApprovalWidget,
    ),
  ),
  "executive-kpi": dynamic(() =>
    import("@/features/dashboard/widgets/ExecutiveKpiWidget").then(
      (module) => module.ExecutiveKpiWidget,
    ),
  ),
} satisfies Record<string, ComponentType<{ data: DashboardData }>>;

const widgets: DashboardWidgetDefinition[] = [
  {
    id: "asset-summary",
    title: "Asset Summary",
    roles: ["STAFF", "MANAGER", "DIRECTOR"],
  },
  {
    id: "asset-value",
    title: "Asset Value",
    roles: ["STAFF", "MANAGER", "DIRECTOR"],
  },
  {
    id: "asset-distribution",
    title: "Asset Distribution",
    roles: ["STAFF", "MANAGER", "DIRECTOR"],
  },
  {
    id: "recent-activity",
    title: "Recent Activity",
    roles: ["STAFF", "MANAGER", "DIRECTOR"],
  },
  {
    id: "pending-approval",
    title: "Pending Approval",
    roles: ["MANAGER"],
  },
  {
    id: "executive-kpi",
    title: "Executive KPI",
    roles: ["DIRECTOR"],
  },
];

type DashboardRendererProps = {
  data: DashboardData;
  role: Role;
};

export function DashboardRenderer({ data, role }: DashboardRendererProps) {
  const visibleWidgets = widgets.filter((widget) => widget.roles.includes(role));

  return (
    <div className="grid items-start gap-6 xl:grid-cols-2">
      {visibleWidgets.map((widget) => {
        const Widget = widgetComponents[widget.id];

        return (
          <Suspense fallback={<LoadingState label={`Loading ${widget.title}`} />} key={widget.id}>
            <Widget data={data} />
          </Suspense>
        );
      })}
    </div>
  );
}
