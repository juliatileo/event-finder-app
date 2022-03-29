import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';

import { Event, User } from '@database/entity';

import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

import { UpdateEventBody } from '../../dtos/UpdateEventBody';

@injectable()
export class UpdateEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(
    eventId: number,
    authUserId: number,
    data: UpdateEventBody
  ): Promise<Event> {
    const event: Event = await this.eventRepository.findById(eventId);
    if (!event) throw new AppError('Event not found', 'not.found', 404);

    const user: User = await this.userRepository.findById(authUserId);
    if (!user) throw new AppError('User not found', 'not.found', 404);

    if (event.user_id !== user.id)
      throw new AppError(
        'This user does not have permission to update this event',
        'forbidden.operation',
        403
      );

    return this.eventRepository.update(eventId, data);
  }
}
