import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema({ timestamps: true })
export class Campaign {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'Template',
        required: true,
    })
    templateId: Types.ObjectId;

    @Prop({
        type: [String],
        enum: ['lead', 'premium', 'VIP'],
        default: [],
    })
    targetTags: ('lead' | 'premium' | 'VIP')[];

    @Prop({
        type: String,
        enum: ['draft', 'running', 'completed'],
        default: 'draft',
    })
    status: 'draft' | 'running' | 'completed';

    @Prop()
    scheduledAt?: Date;

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

export const CampaignSchema = SchemaFactory.createForClass(Campaign);