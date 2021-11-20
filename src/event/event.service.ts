import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (!this.condtitionEqValidator(createEventDto.condition_eq)) {
      throw new BadRequestException('condition_eq가 잘못 되었습니다.');
    }
    const condition = this.createEventContdition(createEventDto);
    //나중에 condition 유효성 체크 추가
    return await this.eventRepository.save({ ...createEventDto, condition });
  }

  createEventContdition(createEventDto: CreateEventDto): string {
    const condition_field = createEventDto.condition_field;
    const condition_eq = createEventDto.condition_eq;
    const condition_value = createEventDto.condition_value;

    const condition = `${condition_field} ${condition_eq} ${condition_value}`;

    return condition;
  }

  condtitionEqValidator(condition_eq: string): boolean {
    const operatorList = ['>', '<', '==', '>=', '<='];

    if (operatorList.includes(condition_eq)) {
      return true;
    }

    return false;
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
