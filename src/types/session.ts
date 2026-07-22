import type { Role } from "@/types/role";

export type UserSession = {
  id: string;
  name: string;
  email: string;
  role: Role;
  token?: string;
};
