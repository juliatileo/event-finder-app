import { DeepPartial, Repository } from 'typeorm';

import { dataSource } from '@database/index';
import { User } from '@database/entity';

import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User> = dataSource.getRepository(User);

  async create(data: DeepPartial<User>): Promise<User> {
    const user: User = this.repository.create(data);

    return this.repository.save(user);
  }
}
