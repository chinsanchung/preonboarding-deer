import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from '../history/history.service';
import { EventRepository } from './event.repository';
import { DeerService } from '../deer/deer.service';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from 'src/entities/user.entity';
import { HistoryRepository } from 'src/history/history.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
    private deerService: DeerService,
    private historyService: HistoryService,
    // private historyRepository: HistoryRepository,
  ) {}

  async calculateEvents(user: User): Promise<any> {
    try {
      const result = await this.findEvents();
      // await this.historyService.calculateEvents(user);
    } catch (exception) {
      throw new Error(exception);
    }
    return null;
  }

  async findEvents() {
    return await this.eventRepository.find();
  }
}
