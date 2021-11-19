import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from '../history/history.service';
import { EventRepository } from './event.repository';
import { DeerService } from '../deer/deer.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    private deerService: DeerService,
    private historyService: HistoryService,
  ) {}

  findEvents() {
    return null;
  }
}
