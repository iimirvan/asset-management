import { ChartWidget } from "@/features/dashboard/components/ChartWidget";
import type { DashboardData } from "@/types/dashboard";

type AssetDistributionWidgetProps = {
  data: DashboardData;
};

export function AssetDistributionWidget({ data }: AssetDistributionWidgetProps) {
  return (
    <>
      <ChartWidget
        data={data.distributionByCategory}
        title="Asset Distribution by Category"
        type="bar"
      />
      <ChartWidget
        data={data.distributionByLocation}
        title="Asset Distribution by Location"
        type="pie"
      />
    </>
  );
}
