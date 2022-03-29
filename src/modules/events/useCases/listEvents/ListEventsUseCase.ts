import { inject, injectable } from 'tsyringe';

import { Event } from '@database/entity';

import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

@injectable()
export class ListEventsUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository
  ) {}

  async execute(past: boolean): Promise<Event[]> {
    return this.eventRepository.list(past);
  }
}
