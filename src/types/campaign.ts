import { CampaignStatus } from "../constants/campaign-status";

export interface Campaign {
    id: string;
    workspaceId: string;
    name: string;
    templateId: string;
    contactIds: string[];
    status: CampaignStatus; // "draft" | "running" | "completed" | "failed";
    createdBy: string;
    launchedAt?: Date;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;

}
