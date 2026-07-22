import {
  apiRequest,
  normalizeApiItem,
  normalizeApiList,
} from "@/lib/api-client";

export type AuditAction =
  | "LOGIN"
  | "CREATE"
  | "UPDATE"
  | "DELETE_REQUEST"
  | "APPROVAL"
  | "EXPORT";

export type AuditEvent = {
  id: string;
  action: AuditAction;
  actor: string;
  message: string;
  createdAt: string;
};

type AuditLogDto = {
  action?: AuditAction;
  actor?: string;
  created_at?: string;
  id?: string;
  message?: string;
};

export function logAuditEvent(event: Omit<AuditEvent, "id" | "createdAt">) {
  const optimisticEvent: AuditEvent = {
    createdAt: new Date().toISOString(),
    id: `audit-${Date.now()}`,
    ...event,
  };

  void apiRequest<unknown>("/api/audit-logs", {
    body: {
      action: event.action,
      actor: event.actor,
      id: optimisticEvent.id,
      message: event.message,
    },
    method: "POST",
  }).catch(() => undefined);

  return optimisticEvent;
}

export async function getAuditEvents() {
  const response = await apiRequest<unknown>("/api/audit-logs", {
    query: {
      sortBy: "created_at",
      sortDir: "desc",
    },
  });
  const result = normalizeApiList<AuditLogDto>(response);

  return result.data.map(mapAuditEvent);
}

export async function getAuditEventById(id: string) {
  const response = await apiRequest<unknown>(`/api/audit-logs/${id}`);
  const event = normalizeApiItem<AuditLogDto | null>(response);

  return event ? mapAuditEvent(event) : null;
}

function mapAuditEvent(dto: AuditLogDto): AuditEvent {
  return {
    action: dto.action ?? "UPDATE",
    actor: dto.actor ?? "",
    createdAt: dto.created_at ?? new Date().toISOString(),
    id: dto.id ?? "",
    message: dto.message ?? "",
  };
}
