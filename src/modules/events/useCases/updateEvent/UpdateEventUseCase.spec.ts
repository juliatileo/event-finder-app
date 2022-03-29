import { format } from 'date-fns';

import { AppError } from '@errors/AppError';

import { Event } from '@database/entity';

import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { EventRepositoryInMemory } from '../../repositories/in-memory/EventRepositoryInMemory';

import { UpdateEventUseCase } from './UpdateEventUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;

let updateEventUseCase: UpdateEventUseCase;

describe('UpdateEventUseCase', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();

    updateEventUseCase = new UpdateEventUseCase(
      eventRepositoryInMemory,
      userRepositoryInMemory
    );
  });

  it('should be able to update an event', async () => {
    const date: string = format(new Date(), 'yyyy-MM-dd');
    const { id: userId } = await userRepositoryInMemory.create({ id: 1 });
    const { id: eventId } = await eventRepositoryInMemory.create(
      { id: 1 },
      userId
    );

    const event: Event = await updateEventUseCase.execute(eventId, userId, {
      name: 'test',
      organizer: 'test',
      date,
    });

    expect(event.name).toBe('test');
    expect(event.organizer).toBe('test');
    expect(event.date).toBe(date);
  });

  it('should not be able to update an event if it does not exists', async () => {
    const { id: userId } = await userRepositoryInMemory.create({ id: 1 });

    await expect(updateEventUseCase.execute(0, userId, {})).rejects.toEqual(
      new AppError('Event not found', 'not.found', 404)
    );
  });

  it('should not be able to update an event if user does not exists', async () => {
    const { id: eventId } = await eventRepositoryInMemory.create({ id: 1 }, 1);

    await expect(updateEventUseCase.execute(eventId, 1, {})).rejects.toEqual(
      new AppError('User not found', 'not.found', 404)
    );
  });

  it('should not be able to update an event if user is not event owner', async () => {
    const { id: userId } = await userRepositoryInMemory.create({ id: 1 });
    const { id: eventId } = await eventRepositoryInMemory.create({ id: 1 }, 0);

    await expect(
      updateEventUseCase.execute(eventId, userId, {})
    ).rejects.toEqual(
      new AppError(
        'This user does not have permission to update this event',
        'forbidden.operation',
        403
      )
    );
  });
});
