import { KpiCard } from "@/features/dashboard/components/KpiCard";
import type { DashboardData } from "@/types/dashboard";

type AssetSummaryWidgetProps = {
  data: DashboardData;
};

export function AssetSummaryWidget({ data }: AssetSummaryWidgetProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <KpiCard
        label="Total Asset"
        value={String(data.assetSummary.totalAsset)}
      />
      <KpiCard
        label="Active Asset"
        tone="success"
        value={String(data.assetSummary.activeAsset)}
      />
      <KpiCard
        label="Damaged Asset"
        tone="danger"
        value={String(data.assetSummary.damagedAsset)}
      />
      <KpiCard
        label="Lost Asset"
        tone="warning"
        value={String(data.assetSummary.lostAsset)}
      />
    </section>
  );
}
