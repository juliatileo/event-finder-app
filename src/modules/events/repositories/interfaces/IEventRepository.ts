import { DeepPartial } from 'typeorm';

import { Event } from '@database/entity';

export interface IEventRepository {
  findById(id: number): Promise<Event>;
  list(past: boolean): Promise<Event[]>;
  create(data: DeepPartial<Event>, userId: number): Promise<Event>;
  update(eventId: number, data: DeepPartial<Event>): Promise<Event>;
  delete(eventId: number): Promise<Event>;
}
