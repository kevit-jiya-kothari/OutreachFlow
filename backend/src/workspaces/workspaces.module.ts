import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspacesService } from './workspaces.service.js';
import { WorkspacesController } from './workspaces.controller.js';
import { WorkspacesRepository } from './repositories/workspaces.repository.js';
import { Workspace, WorkspaceSchema } from './schemas/workspace.schema.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  providers: [WorkspacesService,  WorkspacesRepository],
  controllers: [WorkspacesController],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
