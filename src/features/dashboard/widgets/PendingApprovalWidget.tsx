import { ApprovalWidget } from "@/features/dashboard/components/ApprovalWidget";
import type { DashboardData } from "@/types/dashboard";

type PendingApprovalWidgetProps = {
  data: DashboardData;
};

export function PendingApprovalWidget({ data }: PendingApprovalWidgetProps) {
  return (
    <ApprovalWidget
      approved={data.pendingApproval.approved}
      pending={data.pendingApproval.pending}
      rejected={data.pendingApproval.rejected}
    />
  );
}
