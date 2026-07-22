export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AssetDeleteRequest = {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  requestedBy: string;
  reason: string;
  status: ApprovalStatus;
  approvedBy?: string;
  approvedAt?: Date;
  requestedAt: Date;
};

export type ApprovalDecisionPayload = {
  id: string;
  approvedBy: string;
};

export type DeleteRequestPayload = {
  assetId: string;
  assetCode: string;
  assetName: string;
  requestedBy: string;
  reason: string;
};
