import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { Event } from '../entities/event.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@UseGuards(JwtAuthGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async eventAllList(): Promise<Event[]> {
    return this.eventService.eventAllList();
  }

  @Post()
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Patch('/:id')
  updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.updateEvent(Number(id), updateEventDto);
  }
}
