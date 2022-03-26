import { container } from 'tsyringe';

import { IUserRepository } from '@modules/users/repositories/interfaces/IUserRepository';
import { UserRepository } from '@modules/users/repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
