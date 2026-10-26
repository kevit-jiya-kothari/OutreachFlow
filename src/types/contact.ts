export interface Contact {
    readonly id: string;
    workspaceId: string;
    name: string;
    email: string;
    phone: string,
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}
