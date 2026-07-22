import { canAccessRoute } from "@/constants/routes";
import type { Role } from "@/types/role";

export function verifyRouteAccess(role: Role, pathname: string) {
  return canAccessRoute(role, pathname);
}

export function canExportReports(role: Role) {
  return role === "MANAGER" || role === "DIRECTOR";
}

export function canMutateAssets(role: Role) {
  return role === "STAFF" || role === "MANAGER";
}
