"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

import { DataTable, ResponsiveDataCard } from "@/components/shared/data-table";
import { AssetStatusBadge } from "@/features/assets/components/AssetStatusBadge";
import type { ReportData, ReportRow } from "@/types/report";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type ReportTableProps = {
  report: ReportData;
};

export function ReportTable({ report }: ReportTableProps) {
  const columns = useMemo<ColumnDef<ReportRow>[]>(
    () => [
      { accessorKey: "assetCode", header: "Asset Code" },
      { accessorKey: "assetName", header: "Asset Name" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "purchaseDate", header: "Purchase Date" },
      {
        accessorKey: "purchasePrice",
        header: "Purchase Price",
        cell: ({ row }) => currencyFormatter.format(row.original.purchasePrice),
      },
      {
        accessorKey: "currentValue",
        header: "Current Value",
        cell: ({ row }) => currencyFormatter.format(row.original.currentValue),
      },
      {
        accessorKey: "depreciation",
        header: "Depreciation",
        cell: ({ row }) => currencyFormatter.format(row.original.depreciation),
      },
    ],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Assets"
          value={String(report.summary.totalAssets)}
        />
        <SummaryCard
          label="Purchase Value"
          value={currencyFormatter.format(report.summary.totalPurchaseValue)}
        />
        <SummaryCard
          label="Current Value"
          value={currencyFormatter.format(report.summary.totalCurrentValue)}
        />
        <SummaryCard
          label="Depreciation"
          value={currencyFormatter.format(report.summary.totalDepreciation)}
        />
      </div>
      <DataTable
        columns={columns}
        data={report.rows}
        emptyMessage="No report data found"
        getMobileItemKey={(row) => row.id}
        renderMobileItem={(row) => (
          <ResponsiveDataCard
            badge={<AssetStatusBadge status={row.status} />}
            fields={[
              { label: "Category", value: row.category },
              { label: "Location", value: row.location },
              {
                label: "Purchase Date",
                value: row.purchaseDate,
                fullWidth: true,
              },
              {
                label: "Purchase Price",
                value: currencyFormatter.format(row.purchasePrice),
              },
              {
                label: "Current Value",
                value: currencyFormatter.format(row.currentValue),
              },
              {
                label: "Depreciation",
                value: currencyFormatter.format(row.depreciation),
                fullWidth: true,
              },
            ]}
            subtitle={row.assetCode}
            title={row.assetName}
          />
        )}
      />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-bold text-foreground">{value}</p>
    </article>
  );
}
