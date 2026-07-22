import type { ActivityItem } from "@/types/dashboard";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

type ActivityWidgetProps = {
  activities: ActivityItem[];
};

export function ActivityWidget({ activities }: ActivityWidgetProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm">
      <h2 className="text-sm font-bold text-foreground">Recent Activities</h2>
      <div className="mt-4 space-y-3">
        {activities.map((activity) => (
          <article className="rounded-lg border border-border bg-background p-4" key={activity.id}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-sm font-semibold text-foreground">{activity.title}</h3>
              <time className="text-xs font-semibold text-muted-foreground">
                {dateFormatter.format(new Date(activity.timestamp))}
              </time>
            </div>
            <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
              {activity.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
