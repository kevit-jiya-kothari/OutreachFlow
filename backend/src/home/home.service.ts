import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { HomeRepository } from './repositories/home.repository.js';
import { CampaignDocument } from '../campaigns/schemas/campaign.schema.js';

@Injectable()
export class HomeService {
    constructor(
        private readonly homeRepository: HomeRepository,
    ) { }

    async getDashboard(
        userId: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<{
        welcomeMessage: string;
        recentCampaigns: CampaignDocument[];
        topTags: { tag: string; count: number }[];
    }> {
        const user = await this.homeRepository.findUserById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [recentCampaigns, topTags] = await Promise.all([
            this.homeRepository.findRecentCampaigns(workspaceId),
            this.homeRepository.findTopTags(workspaceId),
        ]);

        return {
            welcomeMessage: `Welcome back, ${user.name}!`,
            recentCampaigns,
            topTags,
        };
    }
}

