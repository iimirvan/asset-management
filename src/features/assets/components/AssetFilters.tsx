"use client";

import type { AssetCategory, AssetLocation } from "@/types/asset";

type AssetFiltersProps = {
  categories: AssetCategory[];
  locations: AssetLocation[];
  search: string;
  categoryId: string;
  status: string;
  locationId: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

export function AssetFilters({
  categories,
  categoryId,
  locationId,
  locations,
  onCategoryChange,
  onLocationChange,
  onSearchChange,
  onStatusChange,
  search,
  status,
}: AssetFiltersProps) {
  return (
    <div className="grid gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm md:grid-cols-4">
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Search</span>
        <input
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Name or code"
          type="search"
          value={search}
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Category</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={categoryId}
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
        <span className="text-sm font-semibold text-foreground">Status</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => onStatusChange(event.target.value)}
          value={status}
        >
          <option value="">All status</option>
          <option value="ACTIVE">Active</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="DAMAGED">Damaged</option>
          <option value="LOST">Lost</option>
          <option value="DISPOSED">Disposed</option>
        </select>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-foreground">Location</span>
        <select
          className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
          onChange={(event) => onLocationChange(event.target.value)}
          value={locationId}
        >
          <option value="">All locations</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.building} / {location.floor} / {location.room}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
