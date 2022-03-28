import { AppError } from '@shared/errors/AppError';

import { User } from '@database/entity';

import { FakeHashProvider } from '../../providers/HashProvider/fakes/FakeHashProvider';

import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let hashProvider: FakeHashProvider;

let authUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    hashProvider = new FakeHashProvider();

    authUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      hashProvider
    );
  });

  it('should be able to authenticate user', async () => {
    const user: User = await userRepositoryInMemory.create({
      email: 'test@test.com',
      password: '12345678',
    });

    const auth = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(auth.user.email).toBe(user.email);
    expect(auth.token).toBeTruthy();
  });

  it('should not be able to authenticate user if it does not exists', async () => {
    await expect(
      authUserUseCase.execute({ email: 'test@test.com', password: '12345678' })
    ).rejects.toEqual(new AppError('User not found', 'not.found', 404));
  });

  it('should not be able to authenticate user if password/email does not match', async () => {
    await userRepositoryInMemory.create({
      email: 'test@test.com',
      password: '12345678',
    });

    await expect(
      authUserUseCase.execute({ email: 'test@test.com', password: 'test' })
    ).rejects.toEqual(
      new AppError(
        'Incorrect password/email combination',
        'password.match',
        401
      )
    );
  });
});
