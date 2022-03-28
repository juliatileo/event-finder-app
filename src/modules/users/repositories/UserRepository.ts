import { DeepPartial, Repository } from 'typeorm';
import { hash } from 'bcryptjs';

import { dataSource } from '@database/index';
import { User } from '@database/entity';

import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User> = dataSource.getRepository(User);

  async findById(userId: number): Promise<User> {
    return this.repository.findOneBy({ id: userId });
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.repository.findOne({
      where: { email },
      select: ['username', 'email', 'password'],
    });

    return user;
  }

  async create(data: DeepPartial<User>): Promise<User> {
    const user: User = this.repository.create(data);

    return this.repository.save(user);
  }

  async update(userId: number, data: DeepPartial<User>): Promise<User> {
    if (data.password) data.password = await hash(data?.password, 8);

    return this.repository.save({ id: userId, ...data });
  }
}
