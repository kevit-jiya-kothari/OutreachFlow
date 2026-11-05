import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from 'mongoose';
import { TemplatesService } from './templates.service.js';
import { CreateTemplateDto } from './dto/create-template.dto.js';
import { TemplateDocument } from './schemas/template.schema.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
    };
}

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
    constructor(
        private readonly templatesService: TemplatesService,
    ) { }

    private parseObjectId(id: string): Types.ObjectId {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID');
        }

        return new Types.ObjectId(id);
    }

    @Post()
    async create(
        @Body() dto: CreateTemplateDto,
        @Query('workspaceId') workspaceId: string,
        @Req() request: AuthenticatedRequest,
    ): Promise<TemplateDocument> {
        return this.templatesService.create(
            dto,
            this.parseObjectId(workspaceId),
            this.parseObjectId(request.user.sub),
        );
    }

    @Get()
    async findAll(
        @Query('workspaceId') workspaceId: string,
    ): Promise<TemplateDocument[]> {
        return this.templatesService.findAll(
            this.parseObjectId(workspaceId),
        );
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
    ): Promise<TemplateDocument> {
        return this.templatesService.findOne(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
        @Body() dto: CreateTemplateDto,
    ): Promise<TemplateDocument> {
        return this.templatesService.update(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
            dto,
        );
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
    ): Promise<TemplateDocument> {
        return this.templatesService.delete(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
        );
    }
}