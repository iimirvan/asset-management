export const dashboardPerformanceBudgetMs = 3000;
export const largeAssetTableRows = 1000;

export function isWithinPerformanceBudget(durationMs: number, budgetMs: number) {
  return durationMs <= budgetMs;
}
