import { Campaign } from "../types/campaign";

export function canEditCampaign(
    campaign: Campaign 
) : boolean {
    return campaign.status === "draft";
}

export function canLaunchCampaign(
    campaign: Campaign
): boolean {
    return (
        campaign.status === "draft" &&
        campaign.contactIds.length > 0
    );
}

export function getCampaignStatusMessage(
    campaign: Campaign
): string {
    if(campaign.status === "draft")
    {
        return "Campaign is ready to be configured.";
    }
    if (campaign.status === "running") 
    {
        return "Campaign is currently running.";
    }
    if (campaign.status === "completed") 
    {
        return "Campaign has completed successfully.";
    }

    return "Campaign failed.";
}

export function filterCampaigns(
    campaigns: Campaign[],
    status?: Campaign["status"]
    ): Campaign[] {
    if (status === undefined) {
        return campaigns;
    }
    return campaigns.filter(
    (campaign) => campaign.status === status
  );
}
