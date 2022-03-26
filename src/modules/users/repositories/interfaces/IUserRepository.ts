import { DeepPartial } from 'typeorm';

import { User } from '@database/entity';

export interface IUserRepository {
  create(data: DeepPartial<User>): Promise<User>;
}
