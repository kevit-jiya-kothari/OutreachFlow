import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { WorkspacesModule } from '../workspaces/workspaces.module.js';
import { WorkspaceMembersController } from './workspace-members.controller.js';
import { WorkspaceMembersService } from './workspace-members.service.js';
import { WorkspaceMembersRepository } from './repositories/workspace-members.repository.js';
import { WorkspaceMember, WorkspaceMemberSchema } from './schemas/workspace-member.schema.js';

@Module({
  imports: [
    AuthModule,
    WorkspacesModule,
    MongooseModule.forFeature([
      {
        name: WorkspaceMember.name,
        schema: WorkspaceMemberSchema,
      },
    ]),
  ],
  controllers: [WorkspaceMembersController],
  providers: [WorkspaceMembersService, WorkspaceMembersRepository],
  exports: [WorkspaceMembersService],
})
export class WorkspaceMembersModule {}
