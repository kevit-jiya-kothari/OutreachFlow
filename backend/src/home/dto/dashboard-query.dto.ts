import { IsMongoId } from 'class-validator';

export class DashboardQueryDto {
    @IsMongoId()
    workspaceId: string;
}