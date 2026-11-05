import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WorkspaceMember, WorkspaceMemberDocument,} from '../schemas/workspace-member.schema.js';

export interface CreateWorkspaceMemberData {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  role: 'owner' | 'admin' | 'member';
}

@Injectable()
export class WorkspaceMembersRepository {
  constructor(
    @InjectModel(WorkspaceMember.name)
    private readonly memberModel: Model<WorkspaceMember>,
  ) {}

  async create( data: CreateWorkspaceMemberData,): Promise<WorkspaceMemberDocument> {
    const member = new this.memberModel(data);
    return member.save();
  }

  async findByWorkspace( workspaceId: Types.ObjectId,): Promise<WorkspaceMemberDocument[]> {
    return this.memberModel.find({ workspaceId }).exec();
  }

  async findByUser(userId: Types.ObjectId,): Promise<WorkspaceMemberDocument[]> {
    return this.memberModel.find({ userId }).exec();
  }

  async findMembership(workspaceId: Types.ObjectId, userId: Types.ObjectId ): Promise<WorkspaceMemberDocument | null> {
    return this.memberModel.findOne({ workspaceId, userId }).exec();
  }
}