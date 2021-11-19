import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeerModule } from '../deer/deer.module';
import { UserModule } from '../user/user.module';
import { HistoryModule } from '../history/history.module';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { HistoryRepository } from 'src/history/history.repository';
import { HistoryService } from 'src/history/history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRepository]),
    DeerModule,
    UserModule,
    HistoryModule,
  ],
  providers: [EventService, HistoryService],
  controllers: [EventController],
})
export class EventModule {}
