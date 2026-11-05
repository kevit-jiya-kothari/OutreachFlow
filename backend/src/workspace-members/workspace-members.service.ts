import {Injectable, ConflictException, NotFoundException, ForbiddenException,} from '@nestjs/common';
import { Types } from 'mongoose';
import { WorkspaceMembersRepository } from './repositories/workspace-members.repository.js';
import { WorkspacesService } from '../workspaces/workspaces.service.js';
import { WorkspaceMemberDocument } from './schemas/workspace-member.schema.js';

@Injectable()
export class WorkspaceMembersService {
  constructor(
    private readonly membersRepository: WorkspaceMembersRepository,
    private readonly workspacesService: WorkspacesService,
  ) {}

  async addMember(
    workspaceId: Types.ObjectId,
    userId: Types.ObjectId,
    requestingUserId: Types.ObjectId,
    role: 'owner' | 'admin' | 'member' = 'member',
  ): Promise<WorkspaceMemberDocument> {
    const workspace = await this.workspacesService.findById(workspaceId);

    if (!workspace) {
        throw new NotFoundException('Workspace not found');
    }

    const isOwner: boolean = workspace.ownerId.equals(requestingUserId);

    const requesterMembership =
      await this.membersRepository.findMembership(
        workspaceId,
        requestingUserId,
      );

    const isAdmin: boolean = requesterMembership?.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('Only workspace owners and admins can add members',);
    }

    const existingMember = await this.membersRepository.findMembership(
      workspaceId,
      userId,
    );

    if (existingMember) {
      throw new ConflictException('User is already a workspace member');
    }

    return this.membersRepository.create({
      workspaceId,
      userId,
      role,
    });
  }

  async getWorkspaceMembers(
    workspaceId: Types.ObjectId,
  ): Promise<WorkspaceMemberDocument[]> {
    return this.membersRepository.findByWorkspace(workspaceId);
  }

  async getUserWorkspaces(
    userId: Types.ObjectId,
  ): Promise<WorkspaceMemberDocument[]> {
    return this.membersRepository.findByUser(userId);
  }
}