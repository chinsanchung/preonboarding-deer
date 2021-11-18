import { Body, Controller, Post } from '@nestjs/common';
import { CreateHistroyDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('/rental')
  async createRentalHistory(@Body() createHistroyDto: CreateHistroyDto) {
    const result = await this.historyService.createRentalHistory(
      createHistroyDto,
    );
    return result;
  }
}