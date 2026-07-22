import {
  apiRequest,
  normalizeApiItem,
  normalizeApiList,
} from "@/lib/api-client";
import type { Role } from "@/types/role";
import type { UserSession } from "@/types/session";

type UserDto = {
  email?: string;
  id?: string;
  name?: string;
  role?: Role;
};

type UserPayload = {
  email: string;
  id: string;
  name: string;
  role: Role;
};

type UserFilters = {
  page?: number;
  limit?: number;
  search?: string;
};

export async function getUsers(filters: UserFilters = {}) {
  const response = await apiRequest<unknown>("/api/users", {
    query: {
      limit: filters.limit,
      page: filters.page,
      search: filters.search,
    },
  });
  const result = normalizeApiList<UserDto>(response);

  return {
    data: result.data.map(mapUser),
    total: result.total,
  };
}

export async function getUserById(id: string) {
  const response = await apiRequest<unknown>(`/api/users/${id}`);
  const user = normalizeApiItem<UserDto | null>(response);

  return user ? mapUser(user) : null;
}

export async function createUser(payload: UserPayload) {
  const response = await apiRequest<unknown>("/api/users", {
    body: payload,
    method: "POST",
  });

  return mapUser(normalizeApiItem<UserDto>(response));
}

export async function updateUser(
  id: string,
  payload: Partial<Pick<UserPayload, "email" | "name" | "role">>,
) {
  const response = await apiRequest<unknown>(`/api/users/${id}`, {
    body: payload,
    method: "PATCH",
  });

  return mapUser(normalizeApiItem<UserDto>(response));
}

export async function deleteUser(id: string) {
  await apiRequest<void>(`/api/users/${id}`, {
    method: "DELETE",
  });
}

function mapUser(dto: UserDto): UserSession {
  return {
    email: dto.email ?? "",
    id: dto.id ?? "",
    name: dto.name ?? "",
    role: dto.role ?? "STAFF",
  };
}
