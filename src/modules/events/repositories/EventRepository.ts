import {
  DeepPartial,
  Repository,
  MoreThanOrEqual,
  FindOneOptions,
} from 'typeorm';

import { dataSource } from '@database/index';
import { Event } from '@database/entity';

import { IEventRepository } from './interfaces/IEventRepository';

export class EventRepository implements IEventRepository {
  private repository: Repository<Event> = dataSource.getRepository(Event);

  async findById(
    eventId: number,
    options: FindOneOptions<Event>
  ): Promise<Event> {
    return this.repository.findOne({ where: { id: eventId }, ...options });
  }

  async list(past: boolean): Promise<Event[]> {
    if (past) return this.repository.find();

    return this.repository.find({
      where: { date: MoreThanOrEqual(new Date()) },
    });
  }

  async create(data: DeepPartial<Event>, userId: number): Promise<Event> {
    return this.repository.save({ ...data, user_id: userId });
  }

  async update(eventId: number, data: DeepPartial<Event>): Promise<Event> {
    return this.repository.save({ id: eventId, ...data });
  }

  async delete(eventId: number): Promise<Event> {
    const event: Event = await this.repository.save({
      id: eventId,
      deleted_at: new Date(),
    });

    return event;
  }
}
