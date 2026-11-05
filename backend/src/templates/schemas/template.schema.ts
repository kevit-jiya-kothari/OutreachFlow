import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

@Schema({ timestamps: true })
export class Template {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({
        type: String,
        enum: ['text', 'image'],
        required: true,
    })
    type: 'text' | 'image';

    @Prop({ required: true, trim: true })
    content: string;

    @Prop({ trim: true })
    imageUrl?: string;

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

export const TemplateSchema = SchemaFactory.createForClass(Template);