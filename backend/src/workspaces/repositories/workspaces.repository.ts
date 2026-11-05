import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workspace, WorkspaceDocument } from '../schemas/workspace.schema.js';

export interface CreateWorkspaceData {
  name: string;
  slug: string;
  ownerId: Types.ObjectId;
}

@Injectable()
export class WorkspacesRepository {
  constructor(
    @InjectModel(Workspace.name)
    private readonly workspaceModel: Model<Workspace>,
  ) {}

  async create(data: CreateWorkspaceData): Promise<WorkspaceDocument> {
    const workspace = new this.workspaceModel(data);
    return workspace.save();
  }

  async findById(id: Types.ObjectId): Promise<WorkspaceDocument | null> {
    return this.workspaceModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<WorkspaceDocument | null> {
    return this.workspaceModel.findOne({ slug }).exec();
  }

  async findByOwner(ownerId: Types.ObjectId): Promise<WorkspaceDocument[]> {
    return this.workspaceModel.find({ ownerId }).exec();
  }
}