import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from 'mongoose';
import { CampaignsService } from './campaigns.service.js';
import { CreateCampaignDto } from './dto/create-campaign.dto.js';
import { CampaignDocument } from './schemas/campaign.schema.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
    };
}

@Controller('campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
    constructor(
        private readonly campaignsService: CampaignsService,
    ) { }

    private parseObjectId(id: string): Types.ObjectId {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID');
        }

        return new Types.ObjectId(id);
    }

    @Post()
    async create(
        @Body() dto: CreateCampaignDto,
        @Query('workspaceId') workspaceId: string,
        @Req() request: AuthenticatedRequest,
    ): Promise<CampaignDocument> {
        return this.campaignsService.create(
            dto,
            this.parseObjectId(workspaceId),
            this.parseObjectId(request.user.sub),
        );
    }

    // Copy campaign
    @Post(':id/copy')
    async copy(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
        @Req() request: AuthenticatedRequest,
    ): Promise<CampaignDocument> {
        return this.campaignsService.copy(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
            this.parseObjectId(request.user.sub),
        );
    }

    @Get()
    async findAll(
        @Query('workspaceId') workspaceId: string,
    ): Promise<CampaignDocument[]> {
        return this.campaignsService.findAll(
            this.parseObjectId(workspaceId),
        );
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
    ): Promise<CampaignDocument> {
        return this.campaignsService.findOne(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
        @Body() dto: CreateCampaignDto,
    ): Promise<CampaignDocument> {
        return this.campaignsService.update(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
            dto,
        );
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
    ): Promise<CampaignDocument> {
        return this.campaignsService.delete(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
        );
    }
}

