"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { canAccessRoute } from "@/constants/routes";
import { useSessionStore } from "@/stores/session-store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSessionStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!canAccessRoute(user.role, pathname)) {
      router.replace("/dashboard");
    }
  }, [pathname, router, user]);

  if (!user || !canAccessRoute(user.role, pathname)) {
    return null;
  }

  return children;
}
