import { DeepPartial } from 'typeorm';

import { User } from '@database/entity';

import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findById(userId: number): Promise<User> {
    return this.users.find((user: User) => user.id === userId);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user: User) => user.email === email);
  }

  async create(data: DeepPartial<User>): Promise<User> {
    const user: User = new User();

    Object.assign(user, data);

    this.users.push(user);

    return user;
  }

  async update(userId: number, data: DeepPartial<User>): Promise<User> {
    const index: number = this.users.findIndex(
      (user: User) => user.id === userId
    );

    const user: User = this.users[index];

    this.users.splice(index, 1);

    return this.create({ ...user, ...data });
  }
}
