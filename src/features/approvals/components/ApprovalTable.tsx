"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { DataTable, ResponsiveDataCard } from "@/components/shared/data-table";
import { ApprovalStatusBadge } from "@/features/approvals/components/ApprovalStatusBadge";
import type { AssetDeleteRequest } from "@/types/approval";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

type ApprovalTableProps = {
  requests: AssetDeleteRequest[];
};

export function ApprovalTable({ requests }: ApprovalTableProps) {
  const columns = useMemo<ColumnDef<AssetDeleteRequest>[]>(
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
        accessorKey: "requestedBy",
        header: "Requested By",
      },
      {
        accessorKey: "requestedAt",
        header: "Requested At",
        cell: ({ row }) => dateFormatter.format(row.original.requestedAt),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <ApprovalStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Link
            className="text-sm font-semibold text-primary hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary"
            href={`/approvals/${row.original.id}`}
          >
            Review
          </Link>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={requests}
      emptyMessage="No approval requests found"
      getMobileItemKey={(request) => request.id}
      renderMobileItem={(request) => (
        <ResponsiveDataCard
          actions={
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary"
              href={`/approvals/${request.id}`}
            >
              <ClipboardCheck aria-hidden="true" size={16} />
              Review
            </Link>
          }
          badge={<ApprovalStatusBadge status={request.status} />}
          fields={[
            { label: "Requested By", value: request.requestedBy },
            {
              label: "Requested At",
              value: dateFormatter.format(request.requestedAt),
            },
          ]}
          subtitle={request.assetCode}
          title={request.assetName}
        />
      )}
    />
  );
}
