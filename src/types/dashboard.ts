import type { Role } from "@/types/role";

export type DashboardWidgetId =
  | "asset-summary"
  | "asset-value"
  | "asset-distribution"
  | "recent-activity"
  | "pending-approval"
  | "executive-kpi";

export type DashboardWidgetDefinition = {
  id: DashboardWidgetId;
  title: string;
  roles: Role[];
};

export type KpiMetric = {
  label: string;
  value: string;
  tone: "primary" | "success" | "warning" | "danger";
};

export type ChartDatum = {
  name: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

export type DashboardData = {
  assetSummary: {
    totalAsset: number;
    activeAsset: number;
    damagedAsset: number;
    lostAsset: number;
  };
  assetValue: {
    totalValue: number;
    depreciation: number;
  };
  distributionByCategory: ChartDatum[];
  distributionByLocation: ChartDatum[];
  recentActivities: ActivityItem[];
  pendingApproval: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
  };
  executiveKpi: {
    totalAssetValue: number;
    assetGrowth: number;
    assetUtilization: number;
    disposalTrend: number;
  };
};
