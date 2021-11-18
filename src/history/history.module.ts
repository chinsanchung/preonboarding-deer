import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';
import { DeerModule } from '../deer/deer.module';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryRepository]), DeerModule],
  providers: [HistoryService],
  controllers: [HistoryController],
})
export class HistoryModule {}
