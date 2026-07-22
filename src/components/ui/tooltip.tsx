type TooltipProps = {
  label: string;
  children: React.ReactNode;
};

export function Tooltip({ children, label }: TooltipProps) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-[70] hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border-strong bg-surface-elevated px-2 py-1 text-xs font-semibold text-surface-elevated-foreground shadow-lg group-hover/tooltip:block group-focus-within/tooltip:block"
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}
