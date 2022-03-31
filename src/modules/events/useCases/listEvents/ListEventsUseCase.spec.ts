import { addDays, subDays } from 'date-fns';

import { Event } from '@database/entity';

import { EventRepositoryInMemory } from '../../repositories/in-memory/EventRepositoryInMemory';

import { ListEventsUseCase } from './ListEventsUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;

let listEventsUseCase: ListEventsUseCase;

describe('ListEventsUseCase', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();

    listEventsUseCase = new ListEventsUseCase(eventRepositoryInMemory);
  });

  it('should be able to list events', async () => {
    const event: Event = await eventRepositoryInMemory.create(
      { id: 1, date: addDays(new Date(), 1) },
      1
    );

    const events: Event[] = await listEventsUseCase.execute(false);

    expect(events).toHaveLength(1);
    expect(events[0]).toBe(event);
  });

  it('should be able to list events on past', async () => {
    const event: Event = await eventRepositoryInMemory.create(
      { id: 1, date: subDays(new Date(), 1) },
      1
    );

    const events: Event[] = await listEventsUseCase.execute(true);

    expect(events).toHaveLength(1);
    expect(events[0]).toBe(event);
  });
});
