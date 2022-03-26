import { DeepPartial } from 'typeorm';

import { User } from '@database/entity';

import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(data: DeepPartial<User>): Promise<User> {
    const user: User = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }
}
