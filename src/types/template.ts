export interface MessageTemplate {
    id: string;
    workspaceId: string;
    name: string;
    type: "text" | "text-image";
    text: string;
    imageUrl?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;

}
