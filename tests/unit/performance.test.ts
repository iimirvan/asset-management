import { describe, expect, it } from "vitest";

import {
  dashboardPerformanceBudgetMs,
  isWithinPerformanceBudget,
  largeAssetTableRows,
} from "@/lib/performance";

describe("performance helpers", () => {
  it("tracks dashboard and table performance thresholds", () => {
    expect(dashboardPerformanceBudgetMs).toBe(3000);
    expect(largeAssetTableRows).toBe(1000);
    expect(isWithinPerformanceBudget(2500, dashboardPerformanceBudgetMs)).toBe(true);
    expect(isWithinPerformanceBudget(3500, dashboardPerformanceBudgetMs)).toBe(false);
  });
});
