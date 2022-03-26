import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

import { User } from '@database/entity';

import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

import { CreateUserBody } from '../dtos/CreateUserBody';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(@Body() body: CreateUserBody): Promise<User> {
    const createUser: CreateUserUseCase = container.resolve(CreateUserUseCase);

    return createUser.execute(body);
  }
}
