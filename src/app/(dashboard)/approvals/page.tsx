"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { RetryErrorState } from "@/components/shared/retry-error-state";
import { ApprovalTable } from "@/features/approvals/components/ApprovalTable";
import { useApprovals } from "@/features/approvals/hooks/useApprovals";

export default function ApprovalsPage() {
  const approvalsQuery = useApprovals();

  return (
    <div className="space-y-6">
      <PageHeader
        description="Review pending asset delete requests and approval history."
        title="Approvals"
      />
      {approvalsQuery.isLoading ? (
        <LoadingState label="Loading approval requests" />
      ) : null}
      {approvalsQuery.isError ? (
        <RetryErrorState
          description="Approval requests could not be loaded."
          onRetry={() => void approvalsQuery.refetch()}
          title="Unable to load approvals"
        />
      ) : null}
      {approvalsQuery.data && approvalsQuery.data.length === 0 ? (
        <EmptyState
          description="There are no delete requests awaiting review."
          title="No approval requests"
        />
      ) : null}
      {approvalsQuery.data && approvalsQuery.data.length > 0 ? (
        <ApprovalTable requests={approvalsQuery.data} />
      ) : null}
    </div>
  );
}
