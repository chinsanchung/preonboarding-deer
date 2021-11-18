import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository])],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
