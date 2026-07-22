export type AssetStatus =
  | "ACTIVE"
  | "MAINTENANCE"
  | "DAMAGED"
  | "LOST"
  | "DISPOSED";

export type Asset = {
  id: string;
  assetCode: string;
  assetName: string;
  categoryId: string;
  categoryName: string;
  locationId: string;
  locationName: string;
  assignedTo: string;
  purchaseDate: Date;
  purchasePrice: number;
  currentValue: number;
  status: AssetStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type AssetCategory = {
  id: string;
  name: string;
  description: string;
};

export type AssetLocation = {
  id: string;
  building: string;
  floor: string;
  room: string;
};

export type AssetFormPayload = {
  assetCode: string;
  assetName: string;
  categoryId: string;
  purchaseDate: string;
  purchasePrice: number;
  locationId: string;
  assignedTo: string;
  status: AssetStatus;
};

export type AssetFilters = {
  search: string;
  categoryId: string;
  status: string;
  locationId: string;
  page: number;
  pageSize: number;
};
