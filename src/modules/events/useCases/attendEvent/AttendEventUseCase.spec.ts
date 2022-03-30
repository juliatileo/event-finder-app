import { Event, User } from '@database/entity';

import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { EventRepositoryInMemory } from '../../repositories/in-memory/EventRepositoryInMemory';

import { AttendEventUseCase } from './AttendEventUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;

let attendEventUseCase: AttendEventUseCase;

describe('AttendEventUseCase', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();

    attendEventUseCase = new AttendEventUseCase(
      eventRepositoryInMemory,
      userRepositoryInMemory
    );
  });

  it('should be able to attend an event', async () => {
    const user: User = await userRepositoryInMemory.create({ id: 1 });
    const { id: eventId } = await eventRepositoryInMemory.create(
      { id: 1, users: [] },
      user.id
    );

    const event: Event = await attendEventUseCase.execute(eventId, user.id);

    expect(event.id).toBe(eventId);
    expect(event.users).toHaveLength(1);
    expect(event.users[0]).toBe(user);
  });

  it('should not be able to attend an event if it does not exists', async () => {
    const { id: userId } = await userRepositoryInMemory.create({ id: 1 });

    await expect(attendEventUseCase.execute(0, userId)).rejects.toEqual(
      new AppError('Event not found', 'not.found', 404)
    );
  });

  it('should not be able to attend an event if user does not exists', async () => {
    const { id: eventId } = await eventRepositoryInMemory.create({ id: 1 }, 0);

    await expect(attendEventUseCase.execute(eventId, 0)).rejects.toEqual(
      new AppError('User not found', 'not.found', 404)
    );
  });
});
