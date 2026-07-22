"use client";

import type { AssetCategory, AssetLocation } from "@/types/asset";
import type { ReportFilters, ReportType } from "@/types/report";

type ReportFilterProps = {
  categories: AssetCategory[];
  filters: ReportFilters;
  locations: AssetLocation[];
  onChange: (filters: ReportFilters) => void;
};

const reportTypes: { label: string; value: ReportType }[] = [
  { label: "Asset Summary", value: "asset-summary" },
  { label: "Asset Category", value: "asset-category" },
  { label: "Asset Location", value: "asset-location" },
  { label: "Asset Movement", value: "asset-movement" },
  { label: "Asset Disposal", value: "asset-disposal" },
  { label: "Asset Depreciation", value: "asset-depreciation" },
];

export function ReportFilter({
  categories,
  filters,
  locations,
  onChange,
}: ReportFilterProps) {
  function updateFilter<Key extends keyof ReportFilters>(
    key: Key,
    value: ReportFilters[Key],
  ) {
    onChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <div className="grid gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm lg:grid-cols-3">
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Report</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => updateFilter("type", event.target.value as ReportType)}
          value={filters.type}
        >
          {reportTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Start Date</span>
        <input
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => updateFilter("startDate", event.target.value)}
          type="date"
          value={filters.startDate}
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">End Date</span>
        <input
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => updateFilter("endDate", event.target.value)}
          type="date"
          value={filters.endDate}
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Category</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => updateFilter("categoryId", event.target.value)}
          value={filters.categoryId}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Location</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => updateFilter("locationId", event.target.value)}
          value={filters.locationId}
        >
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.building} / {location.floor} / {location.room}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Status</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => updateFilter("status", event.target.value)}
          value={filters.status}
        >
          <option value="">All status</option>
          <option value="ACTIVE">Active</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="DAMAGED">Damaged</option>
          <option value="LOST">Lost</option>
          <option value="DISPOSED">Disposed</option>
        </select>
      </label>
    </div>
  );
}
