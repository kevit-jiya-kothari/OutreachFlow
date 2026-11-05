import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from 'mongoose';
import { WorkspacesService } from './workspaces.service.js';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { WorkspaceDocument } from './schemas/workspace.schema.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
  };
}

@Controller('workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {
  constructor(
    private readonly workspacesService: WorkspacesService,
  ) {}

  @Post()
  async createWorkspace(
    @Body() dto: CreateWorkspaceDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<WorkspaceDocument> {
    const ownerId: Types.ObjectId = new Types.ObjectId(
      request.user.sub,
    );

    return this.workspacesService.createWorkspace(
      dto.name,
      ownerId,
    );
  }

  @Get()
  async findMyWorkspaces(
    @Req() request: AuthenticatedRequest,
  ): Promise<WorkspaceDocument[]> {
    const ownerId: Types.ObjectId = new Types.ObjectId(
      request.user.sub,
    );

    return this.workspacesService.findByOwner(ownerId);
  }
}