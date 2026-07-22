import { X } from "lucide-react";

type FilterChipProps = {
  label: string;
  onRemove: () => void;
};

export function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex h-8 items-center gap-1 rounded-full border border-border-strong bg-surface px-2.5 text-xs font-semibold text-foreground">
      {label}
      <button
        aria-label={`Remove ${label} filter`}
        className="rounded-full p-0.5 text-muted-foreground transition hover:bg-surface-muted hover:text-foreground"
        onClick={onRemove}
        type="button"
      >
        <X aria-hidden="true" size={13} />
      </button>
    </span>
  );
}
