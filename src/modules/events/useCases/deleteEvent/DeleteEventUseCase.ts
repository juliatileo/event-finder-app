import { inject, injectable } from 'tsyringe';
import { AppError } from '@errors/AppError';

import { Event, User } from '@database/entity';

import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { IEventRepository } from '../../repositories/interfaces/IEventRepository';

@injectable()
export class DeleteEventUseCase {
  constructor(
    @inject('EventRepository') private eventRepository: IEventRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(eventId: number, authUserId: number): Promise<Event> {
    const event: Event = await this.eventRepository.findById(eventId);
    if (!event) throw new AppError('Event not found', 'not.found', 404);

    const user: User = await this.userRepository.findById(authUserId);
    if (!user) throw new AppError('User not found', 'not.found', 404);

    if (event.user_id !== authUserId)
      throw new AppError(
        'This user does not have permission to delete this event',
        'forbidden.operation',
        403
      );

    return this.eventRepository.delete(eventId);
  }
}
