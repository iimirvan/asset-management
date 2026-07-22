import {
  apiRequest,
  normalizeApiItem,
  normalizeApiList,
} from "@/lib/api-client";
import type {
  Asset,
  AssetCategory,
  AssetFilters,
  AssetFormPayload,
  AssetLocation,
  AssetStatus,
} from "@/types/asset";

type AssetDto = {
  asset_code?: string;
  asset_name?: string;
  assigned_to?: string;
  category?: string;
  category_id?: string;
  category_name?: string;
  created_at?: string;
  current_value?: number | string;
  id?: string;
  location?: string;
  location_id?: string;
  location_name?: string;
  purchase_date?: string;
  purchase_price?: number | string;
  status?: AssetStatus;
  updated_at?: string;
};

type AssetCategoryDto = {
  description?: string | null;
  id?: string;
  name?: string;
};

type AssetLocationDto = {
  building?: string;
  floor?: string;
  id?: string;
  room?: string;
};

export async function getAssets(filters: AssetFilters) {
  const response = await apiRequest<unknown>("/api/assets", {
    query: {
      category_id: filters.categoryId,
      limit: filters.pageSize,
      location_id: filters.locationId,
      page: filters.page,
      search: filters.search,
      sortBy: "created_at",
      sortDir: "desc",
      status: filters.status,
    },
  });
  const result = normalizeApiList<AssetDto>(response);

  return {
    data: result.data.map(mapAsset),
    total: result.total,
  };
}

export async function getAllAssets() {
  const response = await apiRequest<unknown>("/api/assets", {
    query: {
      limit: 1000,
      page: 1,
    },
  });
  const result = normalizeApiList<AssetDto>(response);

  return result.data.map(mapAsset);
}

export async function getAssetById(id: string) {
  const response = await apiRequest<unknown>(`/api/assets/${id}`);
  const asset = normalizeApiItem<AssetDto | null>(response);

  return asset ? mapAsset(asset) : null;
}

export async function createAsset(payload: AssetFormPayload) {
  const response = await apiRequest<unknown>("/api/assets", {
    body: toAssetApiPayload(payload),
    method: "POST",
  });

  return mapAsset(normalizeApiItem<AssetDto>(response));
}

export async function updateAsset(id: string, payload: AssetFormPayload) {
  const response = await apiRequest<unknown>(`/api/assets/${id}`, {
    body: toAssetApiPayload(payload),
    method: "PATCH",
  });

  return mapAsset(normalizeApiItem<AssetDto>(response));
}

export async function getAssetCategories() {
  const response = await apiRequest<unknown>("/api/asset-categories");
  const result = normalizeApiList<AssetCategoryDto>(response);

  return result.data.map(mapAssetCategory);
}

export async function getAssetLocations() {
  const response = await apiRequest<unknown>("/api/asset-locations");
  const result = normalizeApiList<AssetLocationDto>(response);

  return result.data.map(mapAssetLocation);
}

function mapAsset(dto: AssetDto): Asset {
  const purchasePrice = toNumber(dto.purchase_price);

  return {
    assetCode: dto.asset_code ?? "",
    assetName: dto.asset_name ?? "",
    assignedTo: dto.assigned_to ?? "",
    categoryId: dto.category_id ?? "",
    categoryName: dto.category_name ?? dto.category ?? dto.category_id ?? "",
    createdAt: toDate(dto.created_at),
    currentValue:
      dto.current_value === undefined
        ? purchasePrice
        : toNumber(dto.current_value),
    id: dto.id ?? "",
    locationId: dto.location_id ?? "",
    locationName: dto.location_name ?? dto.location ?? dto.location_id ?? "",
    purchaseDate: toDate(dto.purchase_date),
    purchasePrice,
    status: dto.status ?? "ACTIVE",
    updatedAt: toDate(dto.updated_at),
  };
}

function mapAssetCategory(dto: AssetCategoryDto): AssetCategory {
  return {
    description: dto.description ?? "",
    id: dto.id ?? "",
    name: dto.name ?? "",
  };
}

function mapAssetLocation(dto: AssetLocationDto): AssetLocation {
  return {
    building: dto.building ?? "",
    floor: dto.floor ?? "",
    id: dto.id ?? "",
    room: dto.room ?? "",
  };
}

function toAssetApiPayload(payload: AssetFormPayload) {
  return {
    asset_code: payload.assetCode,
    asset_name: payload.assetName,
    assigned_to: payload.assignedTo,
    category_id: payload.categoryId,
    current_value: payload.purchasePrice,
    location_id: payload.locationId,
    purchase_date: payload.purchaseDate,
    purchase_price: payload.purchasePrice,
    status: payload.status,
  };
}

function toDate(value: string | undefined) {
  return value ? new Date(value) : new Date();
}

function toNumber(value: number | string | undefined) {
  if (typeof value === "number") {
    return value;
  }

  return Number(value ?? 0);
}
