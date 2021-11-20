import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
