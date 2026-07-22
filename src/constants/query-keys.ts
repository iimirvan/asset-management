export const queryKeys = {
  approval: (id: string) => ["approval", id] as const,
  approvals: ["approvals"] as const,
  asset: (id: string) => ["asset", id] as const,
  assetCategories: ["asset-categories"] as const,
  assetLocations: ["asset-locations"] as const,
  assets: ["assets"] as const,
  auditTrail: ["audit-trail"] as const,
  dashboard: ["dashboard"] as const,
  reports: ["reports"] as const,
};
