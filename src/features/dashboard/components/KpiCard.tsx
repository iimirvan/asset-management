import { cn } from "@/lib/utils";

const toneStyles = {
  primary: "bg-info-muted text-primary",
  success: "bg-success-muted text-success",
  warning: "bg-warning-muted text-warning",
  danger: "bg-danger-muted text-danger",
};

type KpiCardProps = {
  label: string;
  value: string;
  tone?: keyof typeof toneStyles;
};

export function KpiCard({ label, tone = "primary", value }: KpiCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm">
      <span className={cn("absolute inset-y-0 left-0 w-1", toneStyles[tone])} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
        <span className={cn("size-2 rounded-full", toneStyles[tone])} />
      </div>
      <p className="mt-3 text-2xl font-bold tracking-normal text-foreground">{value}</p>
      <p className="mt-1 text-[11px] font-semibold text-muted-foreground">Current portfolio</p>
    </article>
  );
}
