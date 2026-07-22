"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ApprovalModal } from "@/features/approvals/components/ApprovalModal";
import { ApprovalStatusBadge } from "@/features/approvals/components/ApprovalStatusBadge";
import {
  useApproveRequest,
  useRejectRequest,
} from "@/features/approvals/hooks/useApprovals";
import { useNotificationStore } from "@/features/notifications/stores/notificationStore";
import { useSessionStore } from "@/stores/session-store";
import type { AssetDeleteRequest } from "@/types/approval";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

type ApprovalDetailProps = {
  request: AssetDeleteRequest;
};

export function ApprovalDetail({ request }: ApprovalDetailProps) {
  const user = useSessionStore((state) => state.user);
  const notify = useNotificationStore((state) => state.notify);
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();
  const [modalAction, setModalAction] = useState<"approve" | "reject" | null>(null);
  const isPending = request.status === "PENDING";
  const isProcessing = approveMutation.isPending || rejectMutation.isPending;
  const managerName = user?.name ?? "Manager";

  async function confirmDecision() {
    if (modalAction === "approve") {
      await approveMutation.mutateAsync({
        id: request.id,
        approvedBy: managerName,
      });
      notify({ tone: "success", title: "Request approved" });
    }

    if (modalAction === "reject") {
      await rejectMutation.mutateAsync({
        id: request.id,
        approvedBy: managerName,
      });
      notify({ tone: "error", title: "Request rejected" });
    }

    setModalAction(null);
  }

  const details = [
    ["Asset Code", request.assetCode],
    ["Asset Name", request.assetName],
    ["Requested By", request.requestedBy],
    ["Requested At", dateFormatter.format(request.requestedAt)],
    ["Reason", request.reason],
    ["Approved By", request.approvedBy ?? "-"],
    ["Approved At", request.approvedAt ? dateFormatter.format(request.approvedAt) : "-"],
  ];

  return (
    <>
      <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">{request.assetName}</h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Delete request for {request.assetCode}
            </p>
          </div>
          <ApprovalStatusBadge status={request.status} />
        </div>
        <dl className="grid gap-4 md:grid-cols-2">
          {details.map(([label, value]) => (
            <div className="rounded-lg border border-border bg-background p-4" key={label}>
              <dt className="text-xs font-semibold uppercase text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Link href="/approvals">
            <Button variant="secondary">Back</Button>
          </Link>
          {isPending ? (
            <>
              <Button onClick={() => setModalAction("reject")} variant="danger">
                Reject
              </Button>
              <Button onClick={() => setModalAction("approve")}>Approve</Button>
            </>
          ) : null}
        </div>
      </section>
      <ApprovalModal
        confirmLabel={modalAction === "approve" ? "Approve" : "Reject"}
        description={`This will mark the request as ${
          modalAction === "approve" ? "APPROVED" : "REJECTED"
        }.`}
        isLoading={isProcessing}
        isOpen={modalAction !== null}
        onClose={() => setModalAction(null)}
        onConfirm={confirmDecision}
        title={modalAction === "approve" ? "Approve Request" : "Reject Request"}
      />
    </>
  );
}
