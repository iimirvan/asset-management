import { afterEach, describe, expect, it, vi } from "vitest";

import { getReport } from "@/features/reports/services/reportService";

describe("report service", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("filters report rows by status", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL | Request) => {
        const requestUrl = String(url);

        if (requestUrl.includes("/api/assets")) {
          return Response.json({
            data: [
              {
                asset_code: "AMS-LPT-001",
                asset_name: "ThinkPad X1 Carbon",
                assigned_to: "Rina Staff",
                category_id: "electronics",
                category_name: "Electronics",
                created_at: "2025-01-16T00:00:00.000Z",
                current_value: 20400000,
                id: "asset-001",
                location_id: "hq-2-b",
                location_name: "Headquarters / Floor 2 / B204",
                purchase_date: "2025-01-15",
                purchase_price: 24000000,
                status: "ACTIVE",
                updated_at: "2025-03-11T00:00:00.000Z",
              },
              {
                asset_code: "AMS-PRN-022",
                asset_name: "Color Printer",
                assigned_to: "Branch Admin",
                category_id: "office-equipment",
                category_name: "Office Equipment",
                created_at: "2022-06-13T00:00:00.000Z",
                current_value: 1350000,
                id: "asset-004",
                location_id: "branch-1",
                location_name: "Branch Office / Floor 1 / Front Office",
                purchase_date: "2022-06-12",
                purchase_price: 4500000,
                status: "DAMAGED",
                updated_at: "2025-04-18T00:00:00.000Z",
              },
            ],
            total: 2,
          });
        }

        return Response.json({
          data: [],
          total: 0,
        });
      }),
    );

    const report = await getReport({
      type: "asset-summary",
      startDate: "",
      endDate: "",
      categoryId: "",
      locationId: "",
      status: "ACTIVE",
    });

    expect(report.rows.length).toBeGreaterThan(0);
    expect(report.rows.every((row) => row.status === "ACTIVE")).toBe(true);
  });
});
