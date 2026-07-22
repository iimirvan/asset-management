"use client";

import { useParams } from "next/navigation";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { ApprovalDetail } from "@/features/approvals/components/ApprovalDetail";
import { useApproval } from "@/features/approvals/hooks/useApprovals";

export default function ApprovalDetailPage() {
  const params = useParams<{ id: string }>();
  const approvalQuery = useApproval(params.id);

  return (
    <div className="space-y-6">
      <PageHeader
        description="Approve or reject a pending asset delete request."
        title="Approval Detail"
      />
      {approvalQuery.isLoading ? (
        <LoadingState label="Loading approval detail" />
      ) : null}
      {approvalQuery.isError ? (
        <ErrorState
          description="Approval detail could not be loaded."
          title="Unable to load approval"
        />
      ) : null}
      {approvalQuery.data ? <ApprovalDetail request={approvalQuery.data} /> : null}
      {approvalQuery.data === null ? (
        <EmptyState
          description="The selected approval request does not exist."
          title="Approval request not found"
        />
      ) : null}
    </div>
  );
}
