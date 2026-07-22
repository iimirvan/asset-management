"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import {
  approveRequest,
  createDeleteRequest,
  getApprovalRequestById,
  getApprovalRequests,
  rejectRequest,
} from "@/features/approvals/services/approvalService";
import type {
  ApprovalDecisionPayload,
  DeleteRequestPayload,
} from "@/types/approval";

export function useApprovals() {
  return useQuery({
    queryKey: queryKeys.approvals,
    queryFn: getApprovalRequests,
  });
}

export function useApproval(id: string) {
  return useQuery({
    queryKey: queryKeys.approval(id),
    queryFn: () => getApprovalRequestById(id),
  });
}

export function useCreateDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteRequestPayload) => createDeleteRequest(payload),
    onSuccess: () => {
      void invalidateApprovalDependencies(queryClient);
    },
  });
}

export function useApproveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApprovalDecisionPayload) => approveRequest(payload),
    onSuccess: (request) => {
      queryClient.setQueryData(queryKeys.approval(request.id), request);
      void invalidateApprovalDependencies(queryClient);
    },
  });
}

export function useRejectRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApprovalDecisionPayload) => rejectRequest(payload),
    onSuccess: (request) => {
      queryClient.setQueryData(queryKeys.approval(request.id), request);
      void invalidateApprovalDependencies(queryClient);
    },
  });
}

function invalidateApprovalDependencies(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.approvals }),
    queryClient.invalidateQueries({ queryKey: queryKeys.assets }),
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard }),
    queryClient.invalidateQueries({ queryKey: queryKeys.reports }),
    queryClient.invalidateQueries({ queryKey: queryKeys.auditTrail }),
  ]);
}
