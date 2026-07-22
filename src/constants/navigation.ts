import type { Role } from "@/types/role";

export type NavigationItem = {
  label: string;
  href: string;
  roles: Role[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    roles: ["STAFF", "MANAGER", "DIRECTOR"],
  },
  {
    label: "Assets",
    href: "/assets",
    roles: ["STAFF", "MANAGER"],
  },
  {
    label: "Approvals",
    href: "/approvals",
    roles: ["MANAGER"],
  },
  {
    label: "Reports",
    href: "/reports",
    roles: ["STAFF", "MANAGER", "DIRECTOR"],
  },
];
