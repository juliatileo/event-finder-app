import { AppError } from '@errors/AppError';

import { User } from '@database/entity';

import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';

import { UpdateUserUseCase } from './UpdateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;

let updateUserUseCase: UpdateUserUseCase;

describe('UpdateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();

    updateUserUseCase = new UpdateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to update an user', async () => {
    const { id } = await userRepositoryInMemory.create({
      id: 1,
      username: 'test',
    });

    const user: User = await updateUserUseCase.execute(id, {
      username: 'update',
    });

    expect(user.id).toBe(id);
    expect(user.username).toBe('update');
  });

  it('should not be able to update an user if it does not exists', async () => {
    await expect(updateUserUseCase.execute(0, {})).rejects.toEqual(
      new AppError('User not found', 'not.found', 404)
    );
  });

  it('should not be able to update an user if email is in use', async () => {
    const { email } = await userRepositoryInMemory.create({
      email: 'test@test.com',
    });
    const { id } = await userRepositoryInMemory.create({ id: 1 });

    await expect(updateUserUseCase.execute(id, { email })).rejects.toEqual(
      new AppError(
        'User with the same email already exists',
        'email.conflict',
        409
      )
    );
  });
});
