import { IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCampaignDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMongoId()
    templateId: string;

    @IsArray()
    @IsEnum(['lead', 'premium', 'VIP'], { each: true })
    targetTags: ('lead' | 'premium' | 'VIP')[];

    @IsEnum(['draft', 'running', 'completed'])
    status: 'draft' | 'running' | 'completed';

    @IsOptional()
    @IsDateString()
    scheduledAt?: string;
}