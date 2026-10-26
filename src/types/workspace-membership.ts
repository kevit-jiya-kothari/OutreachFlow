export interface WorkspaceMembership {
    id: string;
    userId: string;
    workspaceId: string;
    role: "admin" | "editor" | "viewer";
    createdAt: Date;
    updatedAt: Date;
}
