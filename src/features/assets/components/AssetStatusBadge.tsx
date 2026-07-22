import type { AssetStatus } from "@/types/asset";

const statusStyles: Record<AssetStatus, string> = {
  ACTIVE: "bg-success-muted text-success",
  MAINTENANCE: "bg-warning-muted text-warning",
  DAMAGED: "bg-danger-muted text-danger",
  LOST: "bg-surface-muted text-muted-foreground",
  DISPOSED: "bg-info-muted text-info",
};

type AssetStatusBadgeProps = {
  status: AssetStatus;
};

export function AssetStatusBadge({ status }: AssetStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-current/15 px-2.5 py-1 text-[11px] font-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
