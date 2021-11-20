import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { Event } from '../entities/event.entity';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async eventAllList(): Promise<Event[]> {
    return this.eventService.eventAllList();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }
}
