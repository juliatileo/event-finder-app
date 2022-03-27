import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';

import { CreateUserUseCase } from './CreateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;

let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create an user', async () => {
    const create = await createUserUseCase.execute({
      email: 'test@test.com',
      username: 'test',
      password: 'password',
    });

    expect(create.user.email).toBe('test@test.com');
    expect(create.user.username).toBe('test');
    expect(create.token).toBeTruthy();
  });
});
