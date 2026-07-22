"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { RetryErrorState } from "@/components/shared/retry-error-state";
import { DashboardRenderer } from "@/features/dashboard/components/DashboardRenderer";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useSessionStore } from "@/stores/session-store";

export default function DashboardPage() {
  const user = useSessionStore((state) => state.user);
  const dashboardQuery = useDashboard();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Role-based asset monitoring, approvals, and executive indicators."
      />
      {dashboardQuery.isLoading ? <LoadingState label="Loading dashboard" /> : null}
      {dashboardQuery.isError ? (
        <RetryErrorState
          description="Dashboard widgets could not be loaded."
          onRetry={() => void dashboardQuery.refetch()}
          title="Unable to load dashboard"
        />
      ) : null}
      {!user ? (
        <EmptyState
          description="User session is required to render dashboard widgets."
          title="Session unavailable"
        />
      ) : null}
      {user && dashboardQuery.data ? (
        <DashboardRenderer data={dashboardQuery.data} role={user.role} />
      ) : null}
    </div>
  );
}
