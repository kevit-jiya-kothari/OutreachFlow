import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema.js';
import { Contact, ContactDocument } from '../../contacts/schemas/contact.schema.js';
import { Campaign, CampaignDocument } from '../../campaigns/schemas/campaign.schema.js';

@Injectable()
export class HomeRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,

    @InjectModel(Campaign.name)
    private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  async findUserById(
    userId: Types.ObjectId,
  ): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  async findRecentCampaigns(
    workspaceId: Types.ObjectId,
  ): Promise<CampaignDocument[]> {
    return this.campaignModel
      .find({ workspaceId })
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();
  }

  async findTopTags(
    workspaceId: Types.ObjectId,
  ): Promise<{ tag: string; count: number }[]> {
    return this.contactModel.aggregate<{
      tag: string;
      count: number;
    }>([
      {
        $match: { workspaceId },
      },
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          tag: '$_id',
          count: 1,
        },
      },
    ]);
  }
}