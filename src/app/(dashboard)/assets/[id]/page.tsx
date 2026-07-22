"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { LoadingState } from "@/components/shared/loading-state";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { AssetDetailCard } from "@/features/assets/components/AssetDetailCard";
import { useAsset } from "@/features/assets/hooks/useAssets";
import { DeleteRequestAction } from "@/features/approvals/components/DeleteRequestAction";
import { RoleGuard } from "@/features/auth/components/role-guard";

export default function AssetDetailPage() {
  const params = useParams<{ id: string }>();
  const assetQuery = useAsset(params.id);

  return (
    <div className="space-y-6">
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <Link href="/assets">
              <Button variant="secondary">Back</Button>
            </Link>
            {assetQuery.data ? (
              <RoleGuard allowedRoles={["STAFF", "MANAGER"]}>
                <Link href={`/assets/${assetQuery.data.id}/edit`}>
                  <Button>Edit Asset</Button>
                </Link>
              </RoleGuard>
            ) : null}
          </div>
        }
        description="Review complete asset information."
        title="Asset Detail"
      />
      {assetQuery.isLoading ? <LoadingState label="Loading asset detail" /> : null}
      {assetQuery.isError ? (
        <ErrorState
          description="Asset detail could not be loaded."
          title="Unable to load asset"
        />
      ) : null}
      {assetQuery.data ? (
        <>
          <AssetDetailCard asset={assetQuery.data} />
          <RoleGuard allowedRoles={["STAFF"]}>
            <DeleteRequestAction asset={assetQuery.data} />
          </RoleGuard>
        </>
      ) : null}
      {assetQuery.data === null ? (
        <EmptyState
          description="The selected asset does not exist."
          title="Asset not found"
        />
      ) : null}
    </div>
  );
}
