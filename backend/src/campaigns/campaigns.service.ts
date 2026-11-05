import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CampaignsRepository, CreateCampaignData } from './repositories/campaigns.repository.js';
import { CreateCampaignDto } from './dto/create-campaign.dto.js';
import { CampaignDocument } from './schemas/campaign.schema.js';

@Injectable()
export class CampaignsService {
    constructor(
        private readonly campaignsRepository: CampaignsRepository,
    ) { }

    async create(
        dto: CreateCampaignDto,
        workspaceId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<CampaignDocument> {
        const data: CreateCampaignData = {
            name: dto.name,
            templateId: new Types.ObjectId(dto.templateId),
            targetTags: dto.targetTags,
            status: dto.status,
            ...(dto.scheduledAt && {
                scheduledAt: new Date(dto.scheduledAt),
            }),
            workspaceId,
            createdBy: userId,
        };

        return this.campaignsRepository.create(data);
    }

    async copy(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<CampaignDocument> {
        const campaign: CampaignDocument | null =
            await this.campaignsRepository.findById(id, workspaceId);

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        const data: CreateCampaignData = {
            name: `Copy of ${campaign.name}`,
            templateId: campaign.templateId,
            targetTags: campaign.targetTags,
            status: 'draft',
            ...(campaign.scheduledAt && {
                scheduledAt: campaign.scheduledAt,
            }),
            workspaceId,
            createdBy: userId,
        };

        return this.campaignsRepository.create(data);
    }

    async findAll(
        workspaceId: Types.ObjectId,
    ): Promise<CampaignDocument[]> {
        return this.campaignsRepository.findAll(workspaceId);
    }

    async findOne(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<CampaignDocument> {
        const campaign: CampaignDocument | null =
            await this.campaignsRepository.findById(id, workspaceId);

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        return campaign;
    }

    async update(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
        dto: Partial<CreateCampaignDto>,
    ): Promise<CampaignDocument> {
        const data: Partial<CreateCampaignData> = {
            ...(dto.name !== undefined && {
                name: dto.name,
            }),
            ...(dto.templateId !== undefined && {
                templateId: new Types.ObjectId(dto.templateId),
            }),
            ...(dto.targetTags !== undefined && {
                targetTags: dto.targetTags,
            }),
            ...(dto.status !== undefined && {
                status: dto.status,
            }),
            ...(dto.scheduledAt !== undefined && {
                scheduledAt: new Date(dto.scheduledAt),
            }),
        };

        const campaign: CampaignDocument | null =
            await this.campaignsRepository.update(id, workspaceId, data);

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        return campaign;
    }

    async delete(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<CampaignDocument> {
        const campaign: CampaignDocument | null =
            await this.campaignsRepository.delete(id, workspaceId);

        if (!campaign) {
            throw new NotFoundException('Campaign not found');
        }

        return campaign;
    }
}


