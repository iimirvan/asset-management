import type { LoginFormValues } from "@/features/auth/schemas/auth.schema";
import { logAuditEvent } from "@/features/audit/services/auditService";
import type { Role } from "@/types/role";
import type { UserSession } from "@/types/session";

const mockUsers: Record<
  string,
  {
    name: string;
    password: string;
    role: Role;
  }
> = {
  "director@company.com": {
    name: "Director User",
    password: "password123",
    role: "DIRECTOR",
  },
  "manager@company.com": {
    name: "Manager User",
    password: "password123",
    role: "MANAGER",
  },
  "staff@company.com": {
    name: "Staff User",
    password: "password123",
    role: "STAFF",
  },
};

export async function login(values: LoginFormValues): Promise<UserSession> {
  const normalizedEmail = values.email.toLowerCase();
  const mockUser = mockUsers[normalizedEmail];

  if (!mockUser || mockUser.password !== values.password) {
    throw new Error("Invalid email or password");
  }

  logAuditEvent({
    action: "LOGIN",
    actor: normalizedEmail,
    message: `${mockUser.role} login placeholder completed.`,
  });

  return {
    id: `${mockUser.role.toLowerCase()}-session-placeholder`,
    name: mockUser.name,
    email: normalizedEmail,
    role: mockUser.role,
    token: `${mockUser.role.toLowerCase()}-token-placeholder`,
  };
}

export async function requestPasswordReset() {
  return {
    success: true,
  };
}
