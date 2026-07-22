"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import { getAuditEvents } from "@/features/audit/services/auditService";

export function useAuditTrail() {
  return useQuery({
    queryKey: queryKeys.auditTrail,
    queryFn: getAuditEvents,
  });
}
