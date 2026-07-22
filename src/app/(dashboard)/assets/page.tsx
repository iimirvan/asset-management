"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/shared/empty-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { RetryErrorState } from "@/components/shared/retry-error-state";
import { Button } from "@/components/ui/button";
import { AssetFilters } from "@/features/assets/components/AssetFilters";
import { AssetPagination, AssetTable } from "@/features/assets/components/AssetTable";
import { useAssetOptions, useAssets } from "@/features/assets/hooks/useAssets";
import { RoleGuard } from "@/features/auth/components/role-guard";
import { useSessionStore } from "@/stores/session-store";

export default function AssetsPage() {
  const user = useSessionStore((state) => state.user);
  const canEdit = user?.role === "STAFF" || user?.role === "MANAGER";
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [locationId, setLocationId] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filters = useMemo(
    () => ({
      categoryId,
      locationId,
      page,
      pageSize,
      search,
      status,
    }),
    [categoryId, locationId, page, search, status],
  );

  const assetsQuery = useAssets(filters);
  const options = useAssetOptions();

  function resetPageAndSet(setter: (value: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <RoleGuard allowedRoles={["STAFF", "MANAGER"]}>
            <Link href="/assets/create">
              <Button>Create Asset</Button>
            </Link>
          </RoleGuard>
        }
        description="Manage asset registration, tracking, and lifecycle records."
        title="Assets"
      />
      <AssetFilters
        categories={options.categories}
        categoryId={categoryId}
        locationId={locationId}
        locations={options.locations}
        onCategoryChange={(value) => resetPageAndSet(setCategoryId, value)}
        onLocationChange={(value) => resetPageAndSet(setLocationId, value)}
        onSearchChange={(value) => resetPageAndSet(setSearch, value)}
        onStatusChange={(value) => resetPageAndSet(setStatus, value)}
        search={search}
        status={status}
      />
      {assetsQuery.isLoading || options.isLoading ? (
        <LoadingState label="Loading assets" />
      ) : null}
      {assetsQuery.isError || options.isError ? (
        <RetryErrorState
          description="Asset data could not be loaded."
          onRetry={() => {
            void assetsQuery.refetch();
          }}
          title="Unable to load assets"
        />
      ) : null}
      {assetsQuery.data && assetsQuery.data.total === 0 ? (
        <EmptyState
          description="Try adjusting search or filter criteria."
          title="No assets found"
        />
      ) : null}
      {assetsQuery.data && assetsQuery.data.total > 0 ? (
        <>
          <AssetTable assets={assetsQuery.data.data} canEdit={canEdit} />
          <AssetPagination
            onPageChange={setPage}
            page={page}
            pageSize={pageSize}
            total={assetsQuery.data.total}
          />
        </>
      ) : null}
    </div>
  );
}
