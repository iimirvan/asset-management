import { AssetStatusBadge } from "@/features/assets/components/AssetStatusBadge";
import type { Asset } from "@/types/asset";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
});

type AssetDetailCardProps = {
  asset: Asset;
};

export function AssetDetailCard({ asset }: AssetDetailCardProps) {
  const details = [
    ["Asset Code", asset.assetCode],
    ["Asset Name", asset.assetName],
    ["Category", asset.categoryName],
    ["Location", asset.locationName],
    ["Assigned To", asset.assignedTo],
    ["Purchase Date", dateFormatter.format(asset.purchaseDate)],
    ["Purchase Price", currencyFormatter.format(asset.purchasePrice)],
    ["Current Value", currencyFormatter.format(asset.currentValue)],
    ["Created At", dateFormatter.format(asset.createdAt)],
    ["Updated At", dateFormatter.format(asset.updatedAt)],
  ];

  return (
    <section className="rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">{asset.assetName}</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {asset.assetCode}
          </p>
        </div>
        <AssetStatusBadge status={asset.status} />
      </div>
      <dl className="grid gap-4 md:grid-cols-2">
        {details.map(([label, value]) => (
          <div className="rounded-lg border border-border bg-background p-4" key={label}>
            <dt className="text-xs font-semibold uppercase text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
