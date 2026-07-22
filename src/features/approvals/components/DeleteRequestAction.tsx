"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ApprovalModal } from "@/features/approvals/components/ApprovalModal";
import { useCreateDeleteRequest } from "@/features/approvals/hooks/useApprovals";
import { useNotificationStore } from "@/features/notifications/stores/notificationStore";
import { useSessionStore } from "@/stores/session-store";
import type { Asset } from "@/types/asset";

type DeleteRequestActionProps = {
  asset: Asset;
};

export function DeleteRequestAction({ asset }: DeleteRequestActionProps) {
  const user = useSessionStore((state) => state.user);
  const notify = useNotificationStore((state) => state.notify);
  const mutation = useCreateDeleteRequest();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function requestDelete() {
    await mutation.mutateAsync({
      assetId: asset.id,
      assetCode: asset.assetCode,
      assetName: asset.assetName,
      requestedBy: user?.name ?? "Staff",
      reason: `${asset.assetName} delete request submitted for manager review.`,
    });
    setMessage("Delete request created with PENDING status.");
    notify({
      tone: "warning",
      title: "Delete request created",
      message: "Status is PENDING until manager review.",
    });
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <Button onClick={() => setIsOpen(true)} variant="secondary">
        Request Delete
      </Button>
      {message ? (
        <p className="max-w-xs rounded-lg border border-success bg-success-muted px-3 py-2 text-sm font-semibold text-success">
          {message}
        </p>
      ) : null}
      <ApprovalModal
        confirmLabel="Create Request"
        description="This will create a PENDING delete request. The asset will not be deleted."
        isLoading={mutation.isPending}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={requestDelete}
        title="Request Asset Delete"
      />
    </div>
  );
}
