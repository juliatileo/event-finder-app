import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from '@config/env';
import { AppError } from '@errors/AppError';

import { User } from '@database/entity';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';

import { AuthenticateUserBody } from '../../dtos/AuthenticateUserBody';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserBody): Promise<{ user: User; token: string }> {
    const user: User = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('User not found', 'not.found', 404);

    const passwordMatch: boolean = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch)
      throw new AppError(
        'Incorrect password/email combination',
        'password.match',
        401
      );

    const token: string = sign({ id: user.id }, APP_SECRET, {
      expiresIn: 86400,
    });

    user.password = undefined;

    return { user, token };
  }
}
