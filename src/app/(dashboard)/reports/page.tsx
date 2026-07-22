"use client";

import { useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { RetryErrorState } from "@/components/shared/retry-error-state";
import { ExportButton } from "@/features/reports/components/ExportButton";
import { PrintButton } from "@/features/reports/components/PrintButton";
import { ReportFilter } from "@/features/reports/components/ReportFilter";
import { ReportTable } from "@/features/reports/components/ReportTable";
import { useReports } from "@/features/reports/hooks/useReports";
import { getReportTitle } from "@/features/reports/services/reportService";
import { useAssetOptions } from "@/features/assets/hooks/useAssets";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useSessionStore } from "@/stores/session-store";
import type { ReportFilters } from "@/types/report";

const defaultFilters: ReportFilters = {
  type: "asset-summary",
  startDate: "",
  endDate: "",
  categoryId: "",
  locationId: "",
  status: "",
};

export default function ReportsPage() {
  const user = useSessionStore((state) => state.user);
  const [filters, setFilters] = useState<ReportFilters>(defaultFilters);
  const reportQuery = useReports(filters);
  const options = useAssetOptions();

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          reportQuery.data ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <RoleGuard allowedRoles={["MANAGER", "DIRECTOR"]}>
                <ExportButton filters={filters} report={reportQuery.data} type="excel" />
                <ExportButton filters={filters} report={reportQuery.data} type="pdf" />
              </RoleGuard>
              <PrintButton filters={filters} report={reportQuery.data} />
            </div>
          ) : null
        }
        description={
          user?.role === "STAFF"
            ? "Limited report view is available for Staff users."
            : "Filter, export, and print asset reports."
        }
        title={getReportTitle(filters.type)}
      />
      <ReportFilter
        categories={options.categories}
        filters={filters}
        locations={options.locations}
        onChange={setFilters}
      />
      {reportQuery.isLoading || options.isLoading ? (
        <LoadingState label="Loading report" />
      ) : null}
      {reportQuery.isError || options.isError ? (
        <RetryErrorState
          description="Report data could not be loaded."
          onRetry={() => {
            void reportQuery.refetch();
          }}
          title="Unable to load report"
        />
      ) : null}
      {reportQuery.data && reportQuery.data.rows.length === 0 ? (
        <EmptyState
          description="Try adjusting report filters."
          title="No report data"
        />
      ) : null}
      {reportQuery.data && reportQuery.data.rows.length > 0 ? (
        <ReportTable report={reportQuery.data} />
      ) : null}
    </div>
  );
}
