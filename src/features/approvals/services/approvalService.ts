import {
  apiRequest,
  normalizeApiItem,
  normalizeApiList,
} from "@/lib/api-client";
import type {
  ApprovalDecisionPayload,
  ApprovalStatus,
  AssetDeleteRequest,
  DeleteRequestPayload,
} from "@/types/approval";

type DeleteRequestDto = {
  approved_at?: string | null;
  approved_by?: string | null;
  asset_code?: string;
  asset_id?: string;
  asset_name?: string;
  id?: string;
  reason?: string;
  requested_at?: string;
  requested_by?: string;
  status?: ApprovalStatus;
};

export async function getApprovalRequests() {
  const response = await apiRequest<unknown>("/api/asset-delete-requests");
  const result = normalizeApiList<DeleteRequestDto>(response);

  return result.data.map(mapDeleteRequest);
}

export async function getApprovalRequestById(id: string) {
  const response = await apiRequest<unknown>(
    `/api/asset-delete-requests/${id}`,
  );
  const request = normalizeApiItem<DeleteRequestDto | null>(response);

  return request ? mapDeleteRequest(request) : null;
}

export async function createDeleteRequest(payload: DeleteRequestPayload) {
  const response = await apiRequest<unknown>("/api/asset-delete-requests", {
    body: {
      asset_id: payload.assetId,
      id: `approval-${Date.now()}`,
      reason: payload.reason,
      requested_by: payload.requestedBy,
      status: "PENDING",
    },
    method: "POST",
  });

  return mapDeleteRequest({
    asset_code: payload.assetCode,
    asset_name: payload.assetName,
    ...normalizeApiItem<DeleteRequestDto>(response),
  });
}

export async function approveRequest(payload: ApprovalDecisionPayload) {
  return updateRequestStatus(payload.id, "APPROVED", payload.approvedBy);
}

export async function rejectRequest(payload: ApprovalDecisionPayload) {
  return updateRequestStatus(payload.id, "REJECTED", payload.approvedBy);
}

async function updateRequestStatus(
  id: string,
  status: "APPROVED" | "REJECTED",
  approvedBy: string,
) {
  const response = await apiRequest<unknown>(
    `/api/asset-delete-requests/${id}`,
    {
      body: {
        approved_at: new Date().toISOString(),
        approved_by: approvedBy,
        status,
      },
      method: "PATCH",
    },
  );

  return mapDeleteRequest(normalizeApiItem<DeleteRequestDto>(response));
}

function mapDeleteRequest(dto: DeleteRequestDto): AssetDeleteRequest {
  return {
    approvedAt: dto.approved_at ? new Date(dto.approved_at) : undefined,
    approvedBy: dto.approved_by ?? undefined,
    assetCode: dto.asset_code ?? "",
    assetId: dto.asset_id ?? "",
    assetName: dto.asset_name ?? "",
    id: dto.id ?? "",
    reason: dto.reason ?? "",
    requestedAt: dto.requested_at ? new Date(dto.requested_at) : new Date(),
    requestedBy: dto.requested_by ?? "",
    status: dto.status ?? "PENDING",
  };
}
