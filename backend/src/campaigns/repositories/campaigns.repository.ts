import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Campaign, CampaignDocument } from '../schemas/campaign.schema.js';

export interface CreateCampaignData {
    name: string;
    templateId: Types.ObjectId;
    targetTags: ('lead' | 'premium' | 'VIP')[];
    status: 'draft' | 'running' | 'completed';
    scheduledAt?: Date;
    workspaceId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

@Injectable()
export class CampaignsRepository {
    constructor(
        @InjectModel(Campaign.name)
        private readonly campaignModel: Model<Campaign>,
    ) { }

    async create(data: CreateCampaignData): Promise<CampaignDocument> {
        return this.campaignModel.create(data);
    }

    async findAll(
        workspaceId: Types.ObjectId,
    ): Promise<CampaignDocument[]> {
        return this.campaignModel.find({ workspaceId }).exec();
    }

    async findById(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<CampaignDocument | null> {
        return this.campaignModel.findOne({ _id: id, workspaceId }).exec();
    }

    async update(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
        data: Partial<CreateCampaignData>,
    ): Promise<CampaignDocument | null> {
        return this.campaignModel
            .findOneAndUpdate(
                { _id: id, workspaceId },
                data,
                { new: true, runValidators: true },
            )
            .exec();
    }

    async delete(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<CampaignDocument | null> {
        return this.campaignModel
            .findOneAndDelete({ _id: id, workspaceId })
            .exec();
    }
}