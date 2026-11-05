import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { WorkspaceMembersModule } from './workspace-members/workspace-members.module.js';
import { ContactsModule } from './contacts/contacts.module.js';
import { TemplatesModule } from './templates/templates.module.js';
import { CampaignsModule } from './campaigns/campaigns.module.js';
import { HomeModule } from './home/home.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),

    AuthModule,
    UsersModule,
    WorkspacesModule,
    WorkspaceMembersModule,
    ContactsModule,
    TemplatesModule,
    CampaignsModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


