"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { DataTable, ResponsiveDataCard } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { AssetStatusBadge } from "@/features/assets/components/AssetStatusBadge";
import type { Asset } from "@/types/asset";

type AssetTableProps = {
  assets: Asset[];
  canEdit: boolean;
};

export function AssetTable({ assets, canEdit }: AssetTableProps) {
  const columns = useMemo<ColumnDef<Asset>[]>(
    () => [
      {
        accessorKey: "assetCode",
        header: "Asset Code",
      },
      {
        accessorKey: "assetName",
        header: "Asset Name",
      },
      {
        accessorKey: "categoryName",
        header: "Category",
      },
      {
        accessorKey: "locationName",
        header: "Location",
      },
      {
        accessorKey: "assignedTo",
        header: "PIC",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <AssetStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              className="text-sm font-semibold text-primary hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary"
              href={`/assets/${row.original.id}`}
            >
              Detail
            </Link>
            {canEdit ? (
              <Link
                className="text-sm font-semibold text-primary hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary"
                href={`/assets/${row.original.id}/edit`}
              >
                Edit
              </Link>
            ) : null}
          </div>
        ),
      },
    ],
    [canEdit],
  );

  return (
    <DataTable
      columns={columns}
      data={assets}
      emptyMessage="No assets found"
      getMobileItemKey={(asset) => asset.id}
      renderMobileItem={(asset) => (
        <ResponsiveDataCard
          actions={
            <>
              <Link
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-foreground hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-primary"
                href={`/assets/${asset.id}`}
              >
                <Eye aria-hidden="true" size={16} />
                Detail
              </Link>
              {canEdit ? (
                <Link
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border-strong bg-surface px-3 text-sm font-semibold text-foreground hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-primary"
                  href={`/assets/${asset.id}/edit`}
                >
                  <Pencil aria-hidden="true" size={16} />
                  Edit
                </Link>
              ) : null}
            </>
          }
          badge={<AssetStatusBadge status={asset.status} />}
          fields={[
            { label: "Category", value: asset.categoryName },
            { label: "Location", value: asset.locationName },
            { label: "PIC", value: asset.assignedTo, fullWidth: true },
          ]}
          subtitle={asset.assetCode}
          title={asset.assetName}
        />
      )}
    />
  );
}

type AssetPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function AssetPagination({
  onPageChange,
  page,
  pageSize,
  total,
}: AssetPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-muted-foreground">
        Page {page} of {totalPages} / {total} assets
      </p>
      <div className="flex items-center gap-2">
        <Button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
