import { getApprovalRequests } from "@/features/approvals/services/approvalService";
import { getAllAssets } from "@/features/assets/services/assetService";
import type { ReportData, ReportFilters, ReportRow } from "@/types/report";

export async function getReport(filters: ReportFilters): Promise<ReportData> {
  const [assets, approvals] = await Promise.all([getAllAssets(), getApprovalRequests()]);
  const disposalAssetIds = new Set(
    approvals
      .filter((approval) => approval.status === "APPROVED")
      .map((approval) => approval.assetId),
  );

  const rows = assets
    .filter((asset) => {
      const purchaseTime = asset.purchaseDate.getTime();
      const startTime = filters.startDate ? new Date(filters.startDate).getTime() : null;
      const endTime = filters.endDate ? new Date(filters.endDate).getTime() : null;
      const matchesStart = startTime === null || purchaseTime >= startTime;
      const matchesEnd = endTime === null || purchaseTime <= endTime;
      const matchesCategory = !filters.categoryId || asset.categoryId === filters.categoryId;
      const matchesLocation = !filters.locationId || asset.locationId === filters.locationId;
      const matchesStatus = !filters.status || asset.status === filters.status;
      const matchesReportType =
        filters.type !== "asset-disposal" || disposalAssetIds.has(asset.id);

      return (
        matchesStart &&
        matchesEnd &&
        matchesCategory &&
        matchesLocation &&
        matchesStatus &&
        matchesReportType
      );
    })
    .map<ReportRow>((asset) => ({
      id: asset.id,
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      category: asset.categoryName,
      location: asset.locationName,
      status: asset.status,
      purchaseDate: asset.purchaseDate.toISOString().slice(0, 10),
      purchasePrice: asset.purchasePrice,
      currentValue: asset.currentValue,
      depreciation: Math.max(0, asset.purchasePrice - asset.currentValue),
    }));

  return {
    rows,
    summary: {
      totalAssets: rows.length,
      totalPurchaseValue: rows.reduce((total, row) => total + row.purchasePrice, 0),
      totalCurrentValue: rows.reduce((total, row) => total + row.currentValue, 0),
      totalDepreciation: rows.reduce((total, row) => total + row.depreciation, 0),
    },
  };
}

export function getReportTitle(type: ReportFilters["type"]) {
  const titles: Record<ReportFilters["type"], string> = {
    "asset-summary": "Asset Summary Report",
    "asset-category": "Asset Category Report",
    "asset-location": "Asset Location Report",
    "asset-movement": "Asset Movement Report",
    "asset-disposal": "Asset Disposal Report",
    "asset-depreciation": "Asset Depreciation Report",
  };

  return titles[type];
}
