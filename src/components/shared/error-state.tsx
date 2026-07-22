import { CircleAlert } from "lucide-react";

type ErrorStateProps = {
  title: string;
  description?: string;
  retryAction?: React.ReactNode;
};

export function ErrorState({ title, description, retryAction }: ErrorStateProps) {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface p-8 text-center"
      role="alert"
    >
      <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-danger-muted text-danger">
        <CircleAlert aria-hidden="true" size={24} />
      </div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm font-medium leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      {retryAction ? <div className="mt-5">{retryAction}</div> : null}
    </div>
  );
}
