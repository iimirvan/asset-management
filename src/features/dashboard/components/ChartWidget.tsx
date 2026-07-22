"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ChartDatum } from "@/types/dashboard";

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const tooltipStyle = {
  backgroundColor: "var(--surface-elevated)",
  border: "1px solid var(--border-strong)",
  borderRadius: "8px",
  color: "var(--surface-elevated-foreground)",
};

type ChartWidgetProps = {
  title: string;
  data: ChartDatum[];
  type: "bar" | "pie" | "area";
};

export function ChartWidget({ data, title, type }: ChartWidgetProps) {
  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        <span className="text-[10px] font-bold uppercase text-muted-foreground">Live view</span>
      </div>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer height="100%" width="100%">
          {type === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                isAnimationActive={false}
                nameKey="name"
                outerRadius={92}
              >
                {data.map((entry, index) => (
                  <Cell
                    fill={chartColors[index % chartColors.length]}
                    key={entry.name}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          ) : type === "area" ? (
            <AreaChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                dataKey="value"
                fill="var(--info-muted)"
                isAnimationActive={false}
                stroke="var(--chart-1)"
                type="monotone"
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar
                dataKey="value"
                fill="var(--chart-1)"
                isAnimationActive={false}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
