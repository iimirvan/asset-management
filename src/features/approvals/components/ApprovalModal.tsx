"use client";

import { Button } from "@/components/ui/button";

type ApprovalModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ApprovalModal({
  confirmLabel,
  description,
  isLoading = false,
  isOpen,
  onClose,
  onConfirm,
  title,
}: ApprovalModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 backdrop-blur-sm">
      <section
        aria-modal="true"
        className="w-full max-w-md rounded-[var(--radius-card)] border border-border-strong bg-surface-elevated p-6 shadow-xl"
        role="dialog"
      >
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button disabled={isLoading} onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={onConfirm} variant={confirmLabel === "Reject" ? "danger" : "primary"}>
            {isLoading ? "Processing" : confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}
