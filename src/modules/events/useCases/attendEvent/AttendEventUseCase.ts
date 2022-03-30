import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';

import { Event, User } from '@database/entity';

import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

@injectable()
export class AttendEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(eventId: number, authUserId: number): Promise<Event> {
    let event: Event = await this.eventRepository.findById(eventId, {
      relations: ['users'],
    });
    if (!event) throw new AppError('Event not found', 'not.found', 404);

    const user: User = await this.userRepository.findById(authUserId);
    if (!user) throw new AppError('User not found', 'not.found', 404);

    event = await this.eventRepository.update(eventId, {
      ...event,
      users: [...event.users, user],
    });

    return event;
  }
}
