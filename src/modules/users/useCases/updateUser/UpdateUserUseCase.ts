import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';

import { User } from '@database/entity';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

import { UpdateUserBody } from '../../dtos/UpdateUserBody';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(userId: number, data: UpdateUserBody): Promise<User> {
    let user: User = await this.userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 'not.found', 404);

    if (data.email) {
      const userWithEmail: User = await this.userRepository.findByEmail(
        data.email
      );

      if (userWithEmail && userWithEmail.id !== user.id)
        throw new AppError(
          'User with the same email already exists',
          'email.conflict',
          409
        );
    }

    user = await this.userRepository.update(user.id, data);

    return user;
  }
}
