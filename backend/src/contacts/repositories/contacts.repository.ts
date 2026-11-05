import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Contact, ContactDocument } from '../schemas/contact.schema.js';

export interface CreateContactData {
  name: string;
  email: string;
  phone: string;
  tags?: ('lead' | 'premium' | 'VIP')[];
  workspaceId: Types.ObjectId;
  createdBy: Types.ObjectId;
}

@Injectable()
export class ContactsRepository {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) { }

  async create(
    data: CreateContactData,
  ): Promise<ContactDocument> {
    return this.contactModel.create(data);
  }

  async findAll(
    workspaceId: Types.ObjectId,
  ): Promise<ContactDocument[]> {
    return this.contactModel.find({ workspaceId }).exec();
  }

  async findById(
    id: Types.ObjectId,
    workspaceId: Types.ObjectId,
  ): Promise<ContactDocument | null> {
    return this.contactModel.findOne({ _id: id, workspaceId }).exec();
  }

  async update(
    id: Types.ObjectId,
    workspaceId: Types.ObjectId,
    data: Partial<CreateContactData>,
  ): Promise<ContactDocument | null> {
    return this.contactModel
      .findOneAndUpdate(
        { _id: id, workspaceId },
        data,
        { new: true, runValidators: true },
      )
      .exec();
  }

  async delete(
    id: Types.ObjectId,
    workspaceId: Types.ObjectId,
  ): Promise<ContactDocument | null> {
    return this.contactModel
      .findOneAndDelete({ _id: id, workspaceId })
      .exec();
  }
}