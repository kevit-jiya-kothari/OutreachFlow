import { Controller, Post, Get, Body, Param, Req, UseGuards, BadRequestException, } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from 'mongoose';
import { WorkspaceMembersService } from './workspace-members.service.js';
import { AddWorkspaceMemberDto } from './dto/add-workspace-member.dto.js';
import { WorkspaceMemberDocument } from './schemas/workspace-member.schema.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
    };
}

@Controller('workspace-members')
@UseGuards(JwtAuthGuard)
export class WorkspaceMembersController {
    constructor(
        private readonly membersService: WorkspaceMembersService,
    ) { }

    @Get('my-workspaces')
    async getMyWorkspaces(
        @Req() request: AuthenticatedRequest,
    ): Promise<WorkspaceMemberDocument[]> {
        const userId: Types.ObjectId = new Types.ObjectId(
            request.user.sub,
        );

        return this.membersService.getUserWorkspaces(userId);
    }

    @Post(':workspaceId')
    async addMember(
        @Param('workspaceId') workspaceId: string,
        @Body() dto: AddWorkspaceMemberDto,
        @Req() request: AuthenticatedRequest,
    ): Promise<WorkspaceMemberDocument> {
        if (!Types.ObjectId.isValid(workspaceId) ||
            !Types.ObjectId.isValid(dto.userId) ||
            !Types.ObjectId.isValid(request.user.sub)
        ) {
            throw new BadRequestException('Invalid workspace ID');
        }

        const workspaceObjectId: Types.ObjectId = new Types.ObjectId(workspaceId);
        const userObjectId: Types.ObjectId = new Types.ObjectId(dto.userId);
        const requestingUserId: Types.ObjectId = new Types.ObjectId(request.user.sub);

        return this.membersService.addMember(
            workspaceObjectId,
            userObjectId,
            requestingUserId,
            dto.role,
        );
    }

    @Get(':workspaceId')
    async getWorkspaceMembers(
        @Param('workspaceId') workspaceId: string,
    ): Promise<WorkspaceMemberDocument[]> {
        if (!Types.ObjectId.isValid(workspaceId)) {
            throw new BadRequestException('Invalid workspace ID');
        }

        return this.membersService.getWorkspaceMembers(
            new Types.ObjectId(workspaceId),
        );
    }
}