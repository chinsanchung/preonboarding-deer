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

  checkConditionValidate(condition: string): boolean {
    /**
     * 1. 처음은 무조건 영어(변수명)으로 시작합니다. 이벤트 대상은 "가격", "지역 아이디", "킥보드 브랜드", "지역에 주차", "주차장에 주차", "금지구역 주차"으로 고정합니다.
     * 그 다음 반드시 띄어쓰기를 합니다.(\s)
     * 2. 연산자는 >=, >, <=, <, ==, != 만 가능합니다.
     * 그 다음 반드시 띄어쓰기를 합니다.(\s)
     * 3. 마지막은 반드시 숫자로 끝맺습니다.
     */
    const regex =
      /^(price|deer.area.area_id|deer.brand|useMin|isInArea|isInParkingzone|isInForbiddenArea)\s(>=|>|<=|<|==|!=)\s[0-9]+$/;
    if (condition.match(regex)) {
      return true;
    }
    return false;
  }
}
