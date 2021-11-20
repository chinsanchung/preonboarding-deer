import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save({ ...createEventDto });
  }

  async eventGetList(): Promise<Event[]> {
    return await this.eventRepository.find({
      where: {
        is_use: 1,
      },
      order: { plus_minus: 'DESC' },
    });
  }

  async calculatePrice(data: any): Promise<number> {
    const eventList = await this.eventGetList();
    let price = data.price;
    for (const el of eventList) {
      const ifConditon = `data.${el.condition}`;
      if (eval(ifConditon)) {
        if (el.plus_minus == '할인') {
          price = price * (1 - el.applied_number);
        } else {
          price = price + el.applied_number;
        }
      }
    }
    return price;
  }
}
