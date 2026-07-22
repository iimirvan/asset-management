import { ChartWidget } from "@/features/dashboard/components/ChartWidget";
import { KpiCard } from "@/features/dashboard/components/KpiCard";
import type { DashboardData } from "@/types/dashboard";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type ExecutiveKpiWidgetProps = {
  data: DashboardData;
};

export function ExecutiveKpiWidget({ data }: ExecutiveKpiWidgetProps) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2">
        <KpiCard
          label="Executive Total Value"
          value={currencyFormatter.format(data.executiveKpi.totalAssetValue)}
        />
        <KpiCard
          label="Asset Growth"
          tone="success"
          value={`${data.executiveKpi.assetGrowth}%`}
        />
        <KpiCard
          label="Asset Utilization"
          tone="success"
          value={`${data.executiveKpi.assetUtilization}%`}
        />
        <KpiCard
          label="Disposal Trend"
          tone="warning"
          value={String(data.executiveKpi.disposalTrend)}
        />
      </section>
      <ChartWidget
        data={[
          { name: "Jan", value: 3 },
          { name: "Feb", value: 4 },
          { name: "Mar", value: 5 },
          { name: "Apr", value: 4 },
          { name: "May", value: data.executiveKpi.assetGrowth },
        ]}
        title="Monthly Asset Growth"
        type="area"
      />
    </>
  );
}
