import { DeepPartial } from 'typeorm';

import { Event } from '@database/entity';

import { IEventRepository } from '../interfaces/IEventRepository';

export class EventRepositoryInMemory implements IEventRepository {
  private events: Event[] = [];

  async findById(eventId: number): Promise<Event> {
    return this.events.find((event: Event) => event.id === eventId);
  }

  async list(past: boolean): Promise<Event[]> {
    if (past) return this.events;

    return this.events.filter((event: Event) => event.date >= new Date());
  }

  async create(data: DeepPartial<Event>, userId: number): Promise<Event> {
    const event: Event = new Event();

    Object.assign(event, { ...data, user_id: userId });

    this.events.push(event);

    return event;
  }

  async update(eventId: number, data: DeepPartial<Event>): Promise<Event> {
    const index: number = this.events.findIndex(
      (event: Event) => event.id === eventId
    );

    const event: Event = this.events[index];

    this.events.splice(index, 1);

    return this.create({ ...event, ...data }, event.user_id);
  }

  async delete(eventId: number): Promise<Event> {
    const index: number = this.events.findIndex(
      (event: Event) => event.id === eventId
    );

    const event: Event = this.events[index];

    this.events.splice(index, 1);

    return this.create({ ...event, deleted_at: new Date() }, 1);
  }
}
