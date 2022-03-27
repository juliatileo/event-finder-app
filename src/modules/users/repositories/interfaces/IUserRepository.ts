import { DeepPartial } from 'typeorm';

import { User } from '@database/entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  create(data: DeepPartial<User>): Promise<User>;
}
