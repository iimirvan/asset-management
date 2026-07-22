import Link from "next/link";

import { Button } from "@/components/ui/button";

type ApprovalWidgetProps = {
  pending: number;
  approved: number;
  rejected: number;
};

export function ApprovalWidget({ approved, pending, rejected }: ApprovalWidgetProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-foreground">Pending Approval</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Delete requests waiting for manager review.
          </p>
        </div>
        <Link href="/approvals">
          <Button variant="secondary">Review</Button>
        </Link>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Metric label="Pending" value={pending} />
        <Metric label="Approved" value={approved} />
        <Metric label="Rejected" value={rejected} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
