import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, trim: true, lowercase: true })
    email: string;

    @Prop({ required: true, trim: true })
    phone: string;

    @Prop({
        type: [String],
        enum: ['lead', 'premium', 'VIP'],
        default: [],
    })
    tags: ('lead' | 'premium' | 'VIP')[];

    @Prop({
        type: Types.ObjectId,
        ref: 'Workspace',
        required: true,
    })
    workspaceId: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    })
    createdBy: Types.ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);