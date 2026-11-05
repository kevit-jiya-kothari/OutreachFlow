import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeController } from './home.controller.js';
import { HomeService } from './home.service.js';
import { User, UserSchema } from '../users/schemas/user.schema.js';
import { Contact, ContactSchema } from '../contacts/schemas/contact.schema.js';
import { Template, TemplateSchema } from '../templates/schemas/template.schema.js';
import { Campaign, CampaignSchema } from '../campaigns/schemas/campaign.schema.js';
import { AuthModule } from '../auth/auth.module.js';
import { HomeRepository } from './repositories/home.repository.js';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Contact.name, schema: ContactSchema },
      { name: Template.name, schema: TemplateSchema },
      { name: Campaign.name, schema: CampaignSchema },
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService, HomeRepository],
})
export class HomeModule { }
