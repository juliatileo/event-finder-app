import { inject, injectable } from 'tsyringe';
import { isPast, parseISO } from 'date-fns';

import { AppError } from '@errors/AppError';

import { Event, User } from '@database/entity';

import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

import { CreateEventBody } from '../../dtos/CreateEventBody';

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: CreateEventBody, authUserId: number): Promise<Event> {
    if (isPast(parseISO(data.date)))
      throw new AppError('Event date cannot be in the past');

    const user: User = await this.userRepository.findById(authUserId);
    if (!user) throw new AppError('User not found', 'not.found', 404);

    return this.eventRepository.create(data, authUserId);
  }
}
