import type { ApprovalStatus } from "@/types/approval";

const statusStyles: Record<ApprovalStatus, string> = {
  PENDING: "bg-warning-muted text-warning",
  APPROVED: "bg-success-muted text-success",
  REJECTED: "bg-danger-muted text-danger",
};

type ApprovalStatusBadgeProps = {
  status: ApprovalStatus;
};

export function ApprovalStatusBadge({ status }: ApprovalStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/15 px-2.5 py-1 text-[11px] font-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
