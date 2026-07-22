"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Key, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyMessage?: string;
  getMobileItemKey?: (item: TData, index: number) => Key;
  renderMobileItem?: (item: TData) => ReactNode;
};

export function DataTable<TData>({
  columns,
  data,
  emptyMessage = "No data available",
  getMobileItemKey,
  renderMobileItem,
}: DataTableProps<TData>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {renderMobileItem ? (
        <div
          aria-label="Data records"
          className="grid gap-3 md:hidden"
          role="list"
        >
          {data.map((item, index) => (
            <div key={getMobileItemKey?.(item, index) ?? index} role="listitem">
              {renderMobileItem(item)}
            </div>
          ))}
        </div>
      ) : null}
      <div
        className={cn(
          "overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-sm",
          renderMobileItem ? "hidden md:block" : null,
        )}
      >
        <div className="max-h-[42rem] overflow-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-surface-muted text-[11px] font-bold uppercase text-muted-foreground shadow-[0_1px_0_var(--border)]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="whitespace-nowrap px-4 py-3"
                      key={header.id}
                      scope="col"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    className="transition-colors hover:bg-surface-muted/70"
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="px-4 py-3.5 font-medium text-foreground"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-10 text-center font-medium text-muted-foreground"
                    colSpan={columns.length}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

type ResponsiveDataField = {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
};

type ResponsiveDataCardProps = {
  actions?: ReactNode;
  badge?: ReactNode;
  fields: ResponsiveDataField[];
  subtitle?: string;
  title: string;
};

export function ResponsiveDataCard({
  actions,
  badge,
  fields,
  subtitle,
  title,
}: ResponsiveDataCardProps) {
  return (
    <article className="min-w-0 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          {subtitle ? (
            <p className="break-words text-xs font-bold uppercase text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
          <h2 className="mt-1 break-words text-base font-bold text-foreground">
            {title}
          </h2>
        </div>
        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>

      <dl className="mt-4 grid min-w-0 grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4">
        {fields.map((field) => (
          <div
            className={cn("min-w-0", field.fullWidth ? "col-span-2" : null)}
            key={field.label}
          >
            <dt className="text-[11px] font-bold uppercase text-muted-foreground">
              {field.label}
            </dt>
            <dd className="mt-1 break-words text-sm font-semibold text-foreground">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>

      {actions ? (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          {actions}
        </div>
      ) : null}
    </article>
  );
}
