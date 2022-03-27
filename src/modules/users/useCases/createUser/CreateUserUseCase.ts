import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from '@config/env';

import { User } from '@database/entity';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

import { CreateUserBody } from '../../dtos/CreateUserBody';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserBody): Promise<{ user: User; token: string }> {
    const user: User = await this.userRepository.create(data);

    const token: string = sign({ id: user.id }, APP_SECRET, {
      expiresIn: 86400,
    });

    return { user, token };
  }
}
