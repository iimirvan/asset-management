import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-border-strong bg-surface p-8 text-center">
      <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-info-muted text-info">
        <Inbox aria-hidden="true" size={24} />
      </div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm font-medium leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
