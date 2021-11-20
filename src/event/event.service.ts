import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from '../entities/event.entity';
import { UpdateEventDto } from './dto/update-event.dto';

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

  async eventAllList(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async eventConditionList(): Promise<Event[]> {
    return await this.eventRepository.find({
      where: {
        is_use: 1,
      },
      order: { plus_minus: 'DESC' },
    });
  }

  async findOneEvent(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ id });
    if (!event) {
      throw new NotFoundException('해당 ID의 event가 존재하지 않습니다.');
    }
    return event;
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const result = await this.findOneEvent(id);
    result.is_use = updateEventDto.is_use;
    try {
      await this.eventRepository.save(result);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async calculatePrice(data: any): Promise<number> {
    const eventList = await this.eventConditionList();
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
