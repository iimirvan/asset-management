import { getApprovalRequests } from "@/features/approvals/services/approvalService";
import { getAllAssets } from "@/features/assets/services/assetService";
import type { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const [assets, approvals] = await Promise.all([getAllAssets(), getApprovalRequests()]);
  const totalValue = assets.reduce((total, asset) => total + asset.currentValue, 0);
  const purchaseValue = assets.reduce((total, asset) => total + asset.purchasePrice, 0);

  return {
    assetSummary: {
      totalAsset: assets.length,
      activeAsset: assets.filter((asset) => asset.status === "ACTIVE").length,
      damagedAsset: assets.filter((asset) => asset.status === "DAMAGED").length,
      lostAsset: assets.filter((asset) => asset.status === "LOST").length,
    },
    assetValue: {
      totalValue,
      depreciation: Math.max(0, purchaseValue - totalValue),
    },
    distributionByCategory: buildDistribution(assets.map((asset) => asset.categoryName)),
    distributionByLocation: buildDistribution(
      assets.map((asset) => asset.locationName.split(" / ")[0] ?? "Unknown"),
    ),
    recentActivities: [
      ...assets.slice(0, 3).map((asset) => ({
        id: `asset-${asset.id}`,
        title: "Asset Updated",
        description: `${asset.assetName} status is ${asset.status}.`,
        timestamp: asset.updatedAt.toISOString(),
      })),
      ...approvals.slice(0, 2).map((approval) => ({
        id: `approval-${approval.id}`,
        title: "Approval Activity",
        description: `${approval.assetName} delete request is ${approval.status}.`,
        timestamp: approval.approvedAt?.toISOString() ?? approval.requestedAt.toISOString(),
      })),
    ],
    pendingApproval: {
      total: approvals.length,
      approved: approvals.filter((approval) => approval.status === "APPROVED").length,
      rejected: approvals.filter((approval) => approval.status === "REJECTED").length,
      pending: approvals.filter((approval) => approval.status === "PENDING").length,
    },
    executiveKpi: {
      totalAssetValue: totalValue,
      assetGrowth: 12,
      assetUtilization: assets.length
        ? Math.round((assets.filter((asset) => asset.status === "ACTIVE").length / assets.length) * 100)
        : 0,
      disposalTrend: approvals.filter((approval) => approval.status === "APPROVED").length,
    },
  };
}

function buildDistribution(values: string[]) {
  return values.reduce<{ name: string; value: number }[]>((items, value) => {
    const existing = items.find((item) => item.name === value);

    if (existing) {
      existing.value += 1;
      return items;
    }

    return [...items, { name: value, value: 1 }];
  }, []);
}
