import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../entities/user.entity';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  async calculateEvents(user: User): Promise<any> {
    try {
      // const result = await this.findEvents();
      // await this.historyService.calculateEvents(user);
    } catch (exception) {
      throw new Error(exception);
    }
    return null;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save({ ...createEventDto });
  }

  async eventGetList(): Promise<Event[]> {
    return await this.eventRepository.find();
  }
}
