import { BadRequestException, Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { Types } from 'mongoose';
import { HomeService } from './home.service.js';
import { DashboardQueryDto } from './dto/dashboard-query.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
  };
}

@Controller('home')
@UseGuards(JwtAuthGuard)
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
  ) {}

  @Get('dashboard')
  async getDashboard(
    @Query() query: DashboardQueryDto,
    @Req() request: AuthenticatedRequest,
  ) {
    if (!Types.ObjectId.isValid(query.workspaceId)) {
      throw new BadRequestException('Invalid workspace ID');
    }

    const workspaceId: Types.ObjectId =
      new Types.ObjectId(query.workspaceId);

    const userId: Types.ObjectId =
      new Types.ObjectId(request.user.sub);

    return this.homeService.getDashboard(userId, workspaceId);
  }
}
