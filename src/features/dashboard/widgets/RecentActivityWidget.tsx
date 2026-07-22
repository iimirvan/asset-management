import { ActivityWidget } from "@/features/dashboard/components/ActivityWidget";
import type { DashboardData } from "@/types/dashboard";

type RecentActivityWidgetProps = {
  data: DashboardData;
};

export function RecentActivityWidget({ data }: RecentActivityWidgetProps) {
  return <ActivityWidget activities={data.recentActivities} />;
}
