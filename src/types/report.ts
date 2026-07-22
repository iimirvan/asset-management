import type { AssetStatus } from "@/types/asset";

export type ReportType =
  | "asset-summary"
  | "asset-category"
  | "asset-location"
  | "asset-movement"
  | "asset-disposal"
  | "asset-depreciation";

export type ReportFilters = {
  type: ReportType;
  startDate: string;
  endDate: string;
  categoryId: string;
  locationId: string;
  status: string;
};

export type ReportRow = {
  id: string;
  assetCode: string;
  assetName: string;
  category: string;
  location: string;
  status: AssetStatus;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  depreciation: number;
};

export type ReportData = {
  rows: ReportRow[];
  summary: {
    totalAssets: number;
    totalPurchaseValue: number;
    totalCurrentValue: number;
    totalDepreciation: number;
  };
};
