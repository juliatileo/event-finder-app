import { AppError } from '@errors/AppError';

import { Event } from '@database/entity';

import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { EventRepositoryInMemory } from '../../repositories/in-memory/EventRepositoryInMemory';

import { DeleteEventUseCase } from './DeleteEventUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;

let deleteEventUseCase: DeleteEventUseCase;

describe('DeleteEventUseCase', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();

    deleteEventUseCase = new DeleteEventUseCase(
      eventRepositoryInMemory,
      userRepositoryInMemory
    );
  });

  it('should be able to delete an event', async () => {
    const { id: userId } = await userRepositoryInMemory.create({ id: 1 });
    const { id: eventId } = await eventRepositoryInMemory.create(
      { id: 1 },
      userId
    );

    const event: Event = await deleteEventUseCase.execute(eventId, userId);

    expect(event.id).toBe(eventId);
    expect(event.deleted_at).toBeTruthy();
  });

  it('should not be able to delete an event if it does not exists', async () => {
    const { id } = await userRepositoryInMemory.create({ id: 1 });

    await expect(deleteEventUseCase.execute(0, id)).rejects.toEqual(
      new AppError('Event not found', 'not.found', 404)
    );
  });

  it('should not be able to delete an event if user does not exists', async () => {
    const { id } = await eventRepositoryInMemory.create({ id: 1 }, 0);

    await expect(deleteEventUseCase.execute(id, 0)).rejects.toEqual(
      new AppError('User not found', 'not.found', 404)
    );
  });

  it('should not be able to delete an event if user is not event owner', async () => {
    const { id: userId } = await userRepositoryInMemory.create({ id: 1 });
    const { id: eventId } = await eventRepositoryInMemory.create({ id: 1 }, 0);

    await expect(deleteEventUseCase.execute(eventId, userId)).rejects.toEqual(
      new AppError(
        'This user does not have permission to delete this event',
        'forbidden.operation',
        403
      )
    );
  });
});
