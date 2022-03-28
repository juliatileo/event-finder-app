import { DeepPartial } from 'typeorm';

import { User } from '@database/entity';

export interface IUserRepository {
  findById(userId: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: DeepPartial<User>): Promise<User>;
  update(userId: number, data: DeepPartial<User>): Promise<User>;
}
