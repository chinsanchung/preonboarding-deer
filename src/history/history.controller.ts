import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';
import { CreateHistroyDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { QueryHistoryDto } from './dto/query-history.dto';
import { History } from '../entities/history.entity';
import { UpdateHistroyDto } from './dto/update-history.dto';
@UseGuards(JwtAuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/rental')
  async createRentalHistory(
    @Body() createHistroyDto: CreateHistroyDto,
    @GetUser() user: User,
  ): Promise<{ message: string; history_id: number; use_start_at: Date }> {
    const result = await this.historyService.createRentalHistory(
      createHistroyDto,
      user,
    );
    return result;
  }

  @Get()
  getHistoryList(
    @Query() queryHistoryDto: QueryHistoryDto,
    @GetUser() user: User,
  ): Promise<{ history: History[]; count: number }> {
    const limit = queryHistoryDto.limit ? Number(queryHistoryDto.limit) : 10;
    const offset = queryHistoryDto.page
      ? (Number(queryHistoryDto.page) - 1) * limit
      : 0;
    return this.historyService.getHistoryList(user, limit, offset);
  }

  @Patch('/return/:id')
  updateReturnHistory(
    @Param('id') id: string,
    @Body() updateHistroyDto: UpdateHistroyDto,
    @GetUser() user: User,
  ) {
    return this.historyService.updateReturnHistory(
      Number(id),
      updateHistroyDto,
      user,
    );
  }
}
