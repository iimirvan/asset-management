import { cn } from "@/lib/utils";

type Tab<Value extends string> = {
  label: string;
  value: Value;
};

type TabsProps<Value extends string> = {
  tabs: Array<Tab<Value>>;
  value: Value;
  onChange: (value: Value) => void;
};

export function Tabs<Value extends string>({ onChange, tabs, value }: TabsProps<Value>) {
  return (
    <div className="flex gap-5 border-b border-border" role="tablist">
      {tabs.map((tab) => (
        <button
          aria-selected={tab.value === value}
          className={cn(
            "relative pb-2.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground",
            tab.value === value ? "text-foreground" : null,
          )}
          key={tab.value}
          onClick={() => onChange(tab.value)}
          role="tab"
          type="button"
        >
          {tab.label}
          {tab.value === value ? (
            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
