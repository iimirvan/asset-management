import { KpiCard } from "@/features/dashboard/components/KpiCard";
import type { DashboardData } from "@/types/dashboard";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type AssetValueWidgetProps = {
  data: DashboardData;
};

export function AssetValueWidget({ data }: AssetValueWidgetProps) {
  return (
    <section className="grid auto-rows-max content-start gap-4 sm:grid-cols-2">
      <KpiCard
        label="Total Asset Value"
        tone="primary"
        value={currencyFormatter.format(data.assetValue.totalValue)}
      />
      <KpiCard
        label="Depreciation"
        tone="warning"
        value={currencyFormatter.format(data.assetValue.depreciation)}
      />
    </section>
  );
}
