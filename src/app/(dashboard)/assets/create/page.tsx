import { PageHeader } from "@/components/shared/page-header";
import { AssetForm } from "@/features/assets/components/AssetForm";
import { RoleGuard } from "@/features/auth/components/role-guard";

export default function CreateAssetPage() {
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
        <PageHeader
          description="Register a new company asset."
          title="Create Asset"
        />
        <AssetForm />
      </div>
    </RoleGuard>
  );
}
