export const CAMPAIGN_STATUSES = [ "draft", "running" , "completed" , "failed"] as const;

export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];