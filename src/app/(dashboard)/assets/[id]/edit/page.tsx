"use client";

import { useParams } from "next/navigation";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { AssetForm } from "@/features/assets/components/AssetForm";
import { useAsset } from "@/features/assets/hooks/useAssets";
import { RoleGuard } from "@/features/auth/components/role-guard";

export default function EditAssetPage() {
  const params = useParams<{ id: string }>();
  const assetQuery = useAsset(params.id);

  return (
    <RoleGuard
      allowedRoles={["STAFF", "MANAGER"]}
      fallback={
        <PageHeader
          description="Director users have read-only asset access."
          title="Unauthorized"
        />
      }
    >
      <div className="space-y-6">
        <PageHeader description="Update asset information." title="Edit Asset" />
        {assetQuery.isLoading ? <LoadingState label="Loading asset" /> : null}
        {assetQuery.isError ? (
          <ErrorState
            description="Asset data could not be loaded."
            title="Unable to load asset"
          />
        ) : null}
        {assetQuery.data ? <AssetForm asset={assetQuery.data} /> : null}
        {assetQuery.data === null ? (
          <EmptyState
            description="The selected asset does not exist."
            title="Asset not found"
          />
        ) : null}
      </div>
    </RoleGuard>
  );
}
