import { endOfMonth, format, subDays } from 'date-fns';

import { AppError } from '@errors/AppError';

import { Event } from '@database/entity';

import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UserRepositoryInMemory';
import { EventRepositoryInMemory } from '../../repositories/in-memory/EventRepositoryInMemory';

import { CreateEventUseCase } from './CreateEventUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;

let createEventUseCase: CreateEventUseCase;

describe('CreateEventUseCase', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();

    createEventUseCase = new CreateEventUseCase(
      eventRepositoryInMemory,
      userRepositoryInMemory
    );
  });

  it('should be able to create an event', async () => {
    const { id } = await userRepositoryInMemory.create({ id: 1 });
    const date: string = format(endOfMonth(new Date()), 'yyyy-MM-dd');

    const event: Event = await createEventUseCase.execute(
      {
        name: 'test',
        organizer: 'test',
        date,
      },
      id
    );

    expect(event.name).toBe('test');
    expect(event.organizer).toBe('test');
    expect(event.date).toBe(date);
  });

  it('should not be able to create an event if date is on past', async () => {
    const { id } = await userRepositoryInMemory.create({ id: 1 });

    await expect(
      createEventUseCase.execute(
        {
          name: 'test',
          organizer: 'test',
          date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
        },
        id
      )
    ).rejects.toEqual(new AppError('Event date cannot be in the past'));
  });

  it('should not be able to create an event if user does not exists', async () => {
    await expect(
      createEventUseCase.execute(
        {
          name: 'test',
          organizer: 'test',
          date: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
        },
        0
      )
    ).rejects.toEqual(new AppError('User not found', 'not.found', 404));
  });
});
