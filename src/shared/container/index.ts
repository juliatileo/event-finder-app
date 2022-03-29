import { container } from 'tsyringe';

import '@modules/users/providers';

import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { UserRepository } from '@modules/users/repositories/UserRepository';

import { IEventRepository } from '@modules/events/repositories/interfaces/IEventRepository';
import { EventRepository } from '@modules/events/repositories/EventRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IEventRepository>(
  'EventRepository',
  EventRepository
);
