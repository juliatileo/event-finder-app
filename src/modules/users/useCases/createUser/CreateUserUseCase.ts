import { inject, injectable } from 'tsyringe';

import { User } from '@database/entity';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

import { CreateUserBody } from '../../dtos/CreateUserBody';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserBody): Promise<User> {
    const user: User = await this.userRepository.create(data);

    return user;
  }
}
