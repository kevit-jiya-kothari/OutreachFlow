import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from 'mongoose';
import { ContactsService } from './contacts.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { ContactDocument } from './schemas/contact.schema.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
    };
}

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
    constructor(
        private readonly contactsService: ContactsService,
    ) { }

    private parseObjectId(id: string): Types.ObjectId {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID');
        }

        return new Types.ObjectId(id);
    }

    @Post()
    async create(
        @Body() dto: CreateContactDto,
        @Query('workspaceId') workspaceId: string,
        @Req() request: AuthenticatedRequest,
    ): Promise<ContactDocument> {
        return this.contactsService.create(
            dto,
            this.parseObjectId(workspaceId),
            this.parseObjectId(request.user.sub),
        );
    }

    @Get()
    async findAll(
        @Query('workspaceId') workspaceId: string,
    ): Promise<ContactDocument[]> {
        return this.contactsService.findAll(
            this.parseObjectId(workspaceId),
        );
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
    ): Promise<ContactDocument> {
        return this.contactsService.findOne(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
        @Body() dto: CreateContactDto,
    ): Promise<ContactDocument> {
        return this.contactsService.update(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
            dto,
        );
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Query('workspaceId') workspaceId: string,
    ): Promise<ContactDocument> {
        return this.contactsService.remove(
            this.parseObjectId(id),
            this.parseObjectId(workspaceId),
        );
    }
}
