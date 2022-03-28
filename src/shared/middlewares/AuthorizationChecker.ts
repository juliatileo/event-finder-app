import { Action } from 'routing-controllers';
import { verify } from 'jsonwebtoken';

import { Token } from '@shared/types/Token';

import { AppError } from '@errors/AppError';
import { APP_SECRET } from '@config/env';

export function authorizationChecker(action: Action): boolean {
  const header = action.request.headers.authorization;

  if (!header) throw new AppError('Token not present', 'token.invalid', 401);

  const [, token] = header.split(' ');

  if (!token) throw new AppError('Token not present', 'token.invalid', 401);

  try {
    verify(token, APP_SECRET) as Token;
    return true;
  } catch (err) {
    throw new AppError('Token invalid', 'token.invalid', 401);
  }
}
