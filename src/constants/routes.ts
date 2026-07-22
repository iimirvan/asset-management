import type { Role } from "@/types/role";

export const publicRoutes = ["/login", "/forgot-password"] as const;

export const protectedRoutes = {
  STAFF: ["/dashboard", "/assets", "/reports"],
  MANAGER: ["/dashboard", "/assets", "/approvals", "/reports"],
  DIRECTOR: ["/dashboard", "/assets", "/reports"],
} satisfies Record<Role, string[]>;

export function canAccessRoute(role: Role, pathname: string) {
  return protectedRoutes[role].some((route) => pathname.startsWith(route));
}
