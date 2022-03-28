import { Body, JsonController, Post } from 'routing-controllers';
import { container } from 'tsyringe';

import { User } from '@database/entity';

import { AuthenticateUserUseCase } from '../useCases/authenticateUser/AuthenticateUserUseCase';

import { AuthenticateUserBody } from '../dtos/AuthenticateUserBody';

@JsonController('/auth')
export class AuthController {
  @Post('/')
  async auth(
    @Body() body: AuthenticateUserBody
  ): Promise<{ user: User; token: string }> {
    const authUser: AuthenticateUserUseCase = container.resolve(
      AuthenticateUserUseCase
    );

    return authUser.execute(body);
  }
}
