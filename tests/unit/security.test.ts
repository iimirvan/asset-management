import { describe, expect, it } from "vitest";

import { canExportReports, canMutateAssets, verifyRouteAccess } from "@/lib/security";

describe("security helpers", () => {
  it("validates protected route access by role", () => {
    expect(verifyRouteAccess("STAFF", "/assets")).toBe(true);
    expect(verifyRouteAccess("STAFF", "/approvals")).toBe(false);
    expect(verifyRouteAccess("MANAGER", "/approvals")).toBe(true);
  });

  it("limits export and mutation permissions", () => {
    expect(canExportReports("STAFF")).toBe(false);
    expect(canExportReports("DIRECTOR")).toBe(true);
    expect(canMutateAssets("DIRECTOR")).toBe(false);
    expect(canMutateAssets("MANAGER")).toBe(true);
  });
});
