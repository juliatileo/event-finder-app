import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParam,
} from 'routing-controllers';
import { container } from 'tsyringe';

import { Session } from '@shared/types/Session';

import { Event } from '@database/entity';

import { CreateEventUseCase } from '../useCases/createEvent/CreateEventUseCase';
import { ListEventsUseCase } from '../useCases/listEvents/ListEventsUseCase';
import { DeleteEventUseCase } from '../useCases/deleteEvent/DeleteEventUseCase';
import { UpdateEventUseCase } from '../useCases/updateEvent/UpdateEventUseCase';
import { AttendEventUseCase } from '../useCases/attendEvent/AttendEventUseCase';

import { CreateEventBody } from '../dtos/CreateEventBody';
import { UpdateEventBody } from '../dtos/UpdateEventBody';

@JsonController('/events')
export class EventController {
  @Authorized()
  @Get('/')
  async list(@QueryParam('past') past: boolean): Promise<Event[]> {
    const listEvents: ListEventsUseCase = container.resolve(ListEventsUseCase);

    return listEvents.execute(past);
  }

  @Authorized()
  @Post('/')
  async create(
    @Body() data: CreateEventBody,
    @CurrentUser() { id }: Session
  ): Promise<Event> {
    const createEvent: CreateEventUseCase =
      container.resolve(CreateEventUseCase);

    return createEvent.execute(data, id);
  }

  @Authorized()
  @Post('/attend/:event_id')
  async attend(
    @Param('event_id') eventId: number,
    @CurrentUser() { id }: Session
  ): Promise<Event> {
    const attendEvent: AttendEventUseCase =
      container.resolve(AttendEventUseCase);

    return attendEvent.execute(eventId, id);
  }

  @Authorized()
  @Put('/:event_id')
  async update(
    @Param('event_id') eventId: number,
    @CurrentUser() { id }: Session,
    @Body() body: UpdateEventBody
  ): Promise<Event> {
    const updateEvent: UpdateEventUseCase =
      container.resolve(UpdateEventUseCase);

    return updateEvent.execute(eventId, id, body);
  }

  @Authorized()
  @Delete('/:event_id')
  async delete(
    @Param('event_id') eventId: number,
    @CurrentUser() { id }: Session
  ): Promise<Event> {
    const deleteEvent: DeleteEventUseCase =
      container.resolve(DeleteEventUseCase);

    return deleteEvent.execute(eventId, id);
  }
}
