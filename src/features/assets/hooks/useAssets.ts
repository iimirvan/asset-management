"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/constants/query-keys";
import {
  createAsset,
  getAssetById,
  getAssetCategories,
  getAssetLocations,
  getAssets,
  updateAsset,
} from "@/features/assets/services/assetService";
import type { AssetFilters, AssetFormPayload } from "@/types/asset";

export function useAssets(filters: AssetFilters) {
  return useQuery({
    queryKey: [...queryKeys.assets, filters],
    queryFn: () => getAssets(filters),
  });
}

export function useAsset(id: string) {
  return useQuery({
    queryKey: queryKeys.asset(id),
    queryFn: () => getAssetById(id),
  });
}

export function useAssetOptions() {
  const categoriesQuery = useQuery({
    queryKey: queryKeys.assetCategories,
    queryFn: getAssetCategories,
  });

  const locationsQuery = useQuery({
    queryKey: queryKeys.assetLocations,
    queryFn: getAssetLocations,
  });

  return {
    categories: categoriesQuery.data ?? [],
    locations: locationsQuery.data ?? [],
    isLoading: categoriesQuery.isLoading || locationsQuery.isLoading,
    isError: categoriesQuery.isError || locationsQuery.isError,
  };
}

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssetFormPayload) => createAsset(payload),
    onSuccess: () => {
      void invalidateAssetDependencies(queryClient);
    },
  });
}

export function useUpdateAsset(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssetFormPayload) => updateAsset(id, payload),
    onSuccess: (asset) => {
      queryClient.setQueryData(queryKeys.asset(id), asset);
      void invalidateAssetDependencies(queryClient);
    },
  });
}

function invalidateAssetDependencies(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.assets }),
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard }),
    queryClient.invalidateQueries({ queryKey: queryKeys.reports }),
    queryClient.invalidateQueries({ queryKey: queryKeys.auditTrail }),
  ]);
}
