"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { getReport } from "@/features/reports/services/reportService";
import type { ReportFilters } from "@/types/report";

export function useReports(filters: ReportFilters) {
  return useQuery({
    queryKey: [...queryKeys.reports, filters],
    queryFn: () => getReport(filters),
  });
}
