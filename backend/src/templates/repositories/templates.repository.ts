import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Template, TemplateDocument } from '../schemas/template.schema.js';

export interface CreateTemplateData {
    name: string;
    type: 'text' | 'image';
    content: string;
    imageUrl?: string;
    workspaceId: Types.ObjectId;
    createdBy: Types.ObjectId;
}

@Injectable()
export class TemplatesRepository {
    constructor(
        @InjectModel(Template.name)
        private readonly templateModel: Model<Template>,
    ) { }

    async create(data: CreateTemplateData): Promise<TemplateDocument> {
        return this.templateModel.create(data);
    }

    async findAll(
        workspaceId: Types.ObjectId,
    ): Promise<TemplateDocument[]> {
        return this.templateModel.find({ workspaceId }).exec();
    }

    async findById(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<TemplateDocument | null> {
        return this.templateModel.findOne({ _id: id, workspaceId }).exec();
    }

    async update(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
        data: Partial<CreateTemplateData>,
    ): Promise<TemplateDocument | null> {
        return this.templateModel
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
    ): Promise<TemplateDocument | null> {
        return this.templateModel
            .findOneAndDelete({ _id: id, workspaceId })
            .exec();
    }
}