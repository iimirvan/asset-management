import { cn } from "@/lib/utils";

type SegmentedOption<Value extends string> = {
  label: string;
  value: Value;
};

type SegmentedControlProps<Value extends string> = {
  ariaLabel: string;
  options: Array<SegmentedOption<Value>>;
  value: Value;
  onChange: (value: Value) => void;
};

export function SegmentedControl<Value extends string>({
  ariaLabel,
  onChange,
  options,
  value,
}: SegmentedControlProps<Value>) {
  return (
    <div
      aria-label={ariaLabel}
      className="inline-flex rounded-lg border border-border-strong bg-background p-1"
      role="radiogroup"
    >
      {options.map((option) => (
        <button
          aria-checked={option.value === value}
          className={cn(
            "h-8 rounded-md px-3 text-xs font-semibold text-muted-foreground transition",
            option.value === value
              ? "bg-surface-elevated text-foreground shadow-sm"
              : "hover:text-foreground",
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
          role="radio"
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
