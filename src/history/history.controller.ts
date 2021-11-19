import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateHistroyDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/rental')
  async createRentalHistory(
    @Body() createHistroyDto: CreateHistroyDto,
    @GetUser() user: User,
  ) {
    const result = await this.historyService.createRentalHistory(
      createHistroyDto,
      user,
    );
    return result;
  }
}
