"use client";

import type { Role } from "@/types/role";
import { useSessionStore } from "@/stores/session-store";

type RoleGuardProps = {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const user = useSessionStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback;
  }

  return children;
}
