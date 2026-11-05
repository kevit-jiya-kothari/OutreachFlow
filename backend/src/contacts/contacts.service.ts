import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ContactsRepository, CreateContactData } from './repositories/contacts.repository.js';
import { CreateContactDto } from './dto/create-contact.dto.js';
import { ContactDocument } from './schemas/contact.schema.js';

@Injectable()
export class ContactsService {
    constructor(
        private readonly contactsRepository: ContactsRepository,
    ) { }

    async create(
        dto: CreateContactDto,
        workspaceId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<ContactDocument> {
        const data: CreateContactData = {
            ...dto,
            workspaceId,
            createdBy: userId,
        };

        return this.contactsRepository.create(data);
    }

    async findAll(
        workspaceId: Types.ObjectId,
    ): Promise<ContactDocument[]> {
        return this.contactsRepository.findAll(workspaceId);
    }

    async findOne(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<ContactDocument> {
        const contact: ContactDocument | null =
            await this.contactsRepository.findById(id, workspaceId);

        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        return contact;
    }

    async update(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
        dto: Partial<CreateContactDto>,
    ): Promise<ContactDocument> {
        const contact: ContactDocument | null =
            await this.contactsRepository.update(id, workspaceId, dto);

        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        return contact;
    }

    async remove(
        id: Types.ObjectId,
        workspaceId: Types.ObjectId,
    ): Promise<ContactDocument> {
        const contact: ContactDocument | null =
            await this.contactsRepository.delete(id, workspaceId);

        if (!contact) {
            throw new NotFoundException('Contact not found');
        }

        return contact;
    }
}