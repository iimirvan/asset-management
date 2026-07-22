"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import {
  assetSchema,
  type AssetFormValues,
} from "@/features/assets/schemas/assetSchema";
import {
  useAssetOptions,
  useCreateAsset,
  useUpdateAsset,
} from "@/features/assets/hooks/useAssets";
import { useNotificationStore } from "@/features/notifications/stores/notificationStore";
import type { Asset } from "@/types/asset";

type AssetFormProps = {
  asset?: Asset;
};

export function AssetForm({ asset }: AssetFormProps) {
  const router = useRouter();
  const { categories, locations } = useAssetOptions();
  const createMutation = useCreateAsset();
  const updateMutation = useUpdateAsset(asset?.id ?? "");
  const notify = useNotificationStore((state) => state.notify);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      assetCode: asset?.assetCode ?? "",
      assetName: asset?.assetName ?? "",
      assignedTo: asset?.assignedTo ?? "",
      categoryId: asset?.categoryId ?? "",
      locationId: asset?.locationId ?? "",
      purchaseDate: asset ? asset.purchaseDate.toISOString().slice(0, 10) : "",
      purchasePrice: asset?.purchasePrice ?? 0,
      status: asset?.status ?? "ACTIVE",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setFormMessage(null);

    if (asset) {
      await updateMutation.mutateAsync(values);
      setFormMessage("Asset updated successfully.");
      notify({ tone: "success", title: "Asset updated" });
    } else {
      await createMutation.mutateAsync(values);
      setFormMessage("Asset created successfully.");
      notify({ tone: "success", title: "Asset created" });
    }

    router.push("/assets");
  });

  return (
    <form
      className="space-y-6 rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-sm sm:p-6"
      noValidate
      onSubmit={onSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          error={errors.assetCode?.message}
          id="assetCode"
          label="Asset Code"
          placeholder="AMS-LPT-001"
          {...register("assetCode")}
        />
        <TextInput
          error={errors.assetName?.message}
          id="assetName"
          label="Asset Name"
          placeholder="Asset name"
          {...register("assetName")}
        />
        <label className="space-y-2">
          <span className="text-sm font-semibold text-foreground">
            Category
          </span>
          <select
            aria-invalid={Boolean(errors.categoryId)}
            className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            {...register("categoryId")}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId ? (
            <p className="text-sm font-medium text-danger">
              {errors.categoryId.message}
            </p>
          ) : null}
        </label>
        <TextInput
          error={errors.purchaseDate?.message}
          id="purchaseDate"
          label="Purchase Date"
          type="date"
          {...register("purchaseDate")}
        />
        <TextInput
          error={errors.purchasePrice?.message}
          id="purchasePrice"
          label="Purchase Price"
          min={1}
          type="number"
          {...register("purchasePrice")}
        />
        <label className="space-y-2">
          <span className="text-sm font-semibold text-foreground">
            Location
          </span>
          <select
            aria-invalid={Boolean(errors.locationId)}
            className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            {...register("locationId")}
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.building} / {location.floor} / {location.room}
              </option>
            ))}
          </select>
          {errors.locationId ? (
            <p className="text-sm font-medium text-danger">
              {errors.locationId.message}
            </p>
          ) : null}
        </label>
        <TextInput
          error={errors.assignedTo?.message}
          id="assignedTo"
          label="Assigned User"
          placeholder="PIC name"
          {...register("assignedTo")}
        />
        <label className="space-y-2">
          <span className="text-sm font-semibold text-foreground">Status</span>
          <select
            className="h-10 w-full rounded-lg border border-border-strong bg-background px-3 text-sm font-medium text-foreground shadow-sm focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            {...register("status")}
          >
            <option value="ACTIVE">Active</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="DAMAGED">Damaged</option>
            <option value="LOST">Lost</option>
            <option value="DISPOSED">Disposed</option>
          </select>
        </label>
      </div>
      {formMessage ? (
        <p className="rounded-lg border border-success bg-success-muted px-3 py-2 text-sm font-semibold text-success">
          {formMessage}
        </p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button onClick={() => router.push("/assets")} variant="secondary">
          Cancel
        </Button>
        <Button
          disabled={
            isSubmitting || createMutation.isPending || updateMutation.isPending
          }
          type="submit"
        >
          {isSubmitting || createMutation.isPending || updateMutation.isPending
            ? "Saving"
            : "Save Asset"}
        </Button>
      </div>
    </form>
  );
}
