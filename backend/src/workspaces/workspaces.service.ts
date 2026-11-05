import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { WorkspacesRepository } from './repositories/workspaces.repository.js';
import { WorkspaceDocument } from './schemas/workspace.schema.js';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly workspacesRepository: WorkspacesRepository,
  ) {}

    async createWorkspace(name: string, ownerId: Types.ObjectId, ): Promise<WorkspaceDocument> {
        const slug: string = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');

        const existingWorkspace: WorkspaceDocument | null =
        await this.workspacesRepository.findBySlug(slug);

        if (existingWorkspace) {
        throw new ConflictException('Workspace already exists');
        }

        return this.workspacesRepository.create({
        name,
        slug,
        ownerId,
        });
    }

    async findById(id: Types.ObjectId): Promise<WorkspaceDocument | null> {
        return this.workspacesRepository.findById(id);
    }

    async findByOwner(ownerId: Types.ObjectId): Promise<WorkspaceDocument[]> {
        return this.workspacesRepository.findByOwner(ownerId);
    }
}