export interface CampaignMessage {
    id: string,
    campaignId: string;
    workspaceId: string;
    contactId: string;
    recipientName: string;
    recipientEmail: string;
    templateType:"text" | "text-image";
    messageText: string;
    imageUrl?: string;
    status: "pending" | "sent" | "failed";
    sentAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
