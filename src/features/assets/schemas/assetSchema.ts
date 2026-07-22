import { z } from "zod";

const assetStatusSchema = z.enum([
  "ACTIVE",
  "MAINTENANCE",
  "DAMAGED",
  "LOST",
  "DISPOSED",
]);

export const assetSchema = z.object({
  assetCode: z.string().min(1, "Asset code is required"),
  assetName: z.string().min(1, "Asset name is required"),
  categoryId: z.string().min(1, "Category is required"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  purchasePrice: z.coerce.number().min(1, "Purchase price must be greater than 0"),
  locationId: z.string().min(1, "Location is required"),
  assignedTo: z.string().min(1, "Assigned user is required"),
  status: assetStatusSchema,
});

export type AssetFormValues = z.infer<typeof assetSchema>;
