type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading" }: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      className="flex min-h-64 items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface p-8"
      role="status"
    >
      <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
        <span className="size-4 animate-spin rounded-full border-2 border-border border-t-primary" />
        <span>{label}</span>
      </div>
    </div>
  );
}
