import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TemplatesRepository, CreateTemplateData } from './repositories/templates.repository.js';
import { CreateTemplateDto } from './dto/create-template.dto.js';
import { TemplateDocument } from './schemas/template.schema.js';

@Injectable()
export class TemplatesService {
    constructor(
        private readonly templatesRepository: TemplatesRepository,
    ) { }

    async create(
        dto: CreateTemplateDto,
        workspaceId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<TemplateDocument> {
        const data: CreateTemplateData = {
            ...dto,
            workspaceId,
            createdBy: userId,
        };

        return this.templatesRepository.create(data);
    }

    async findAll(
        workspaceId: Types.ObjectId,
    ): Promise<TemplateDocument[]> {
        return this.templatesRepository.findAll(workspaceId);
    }

    async findOne(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<TemplateDocument> {
        const template: TemplateDocument | null =
            await this.templatesRepository.findById(id, workspaceId);

        if (!template) {
            throw new NotFoundException('Template not found');
        }

        return template;
    }

    async update(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
        dto: Partial<CreateTemplateDto>,
    ): Promise<TemplateDocument> {
        const template: TemplateDocument | null =
            await this.templatesRepository.update(id, workspaceId, dto);

        if (!template) {
            throw new NotFoundException('Template not found');
        }

        return template;
    }

    async delete(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<TemplateDocument> {
        const template: TemplateDocument | null =
            await this.templatesRepository.delete(id, workspaceId);

        if (!template) {
            throw new NotFoundException('Template not found');
        }

        return template;
    }
}
