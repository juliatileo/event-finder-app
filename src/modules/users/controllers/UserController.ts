import {
  Authorized,
  Body,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { container } from 'tsyringe';

import { User } from '@database/entity';

import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';
import { UpdateUserUseCase } from '../useCases/updateUser/UpdateUserUseCase';

import { CreateUserBody } from '../dtos/CreateUserBody';
import { UpdateUserBody } from '../dtos/UpdateUserBody';

@JsonController('/users')
export class UserController {
  @Post('/')
  async create(
    @Body() body: CreateUserBody
  ): Promise<{ user: User; token: string }> {
    const createUser: CreateUserUseCase = container.resolve(CreateUserUseCase);

    return createUser.execute(body);
  }

  @Authorized()
  @Put('/:user_id')
  async update(
    @Param('user_id') userId: number,
    @Body() body: UpdateUserBody
  ): Promise<User> {
    const updateUser: UpdateUserUseCase = container.resolve(UpdateUserUseCase);

    return updateUser.execute(userId, body);
  }
}
