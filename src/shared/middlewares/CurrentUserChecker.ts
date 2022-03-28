import { Action } from 'routing-controllers';
import { decode } from 'jsonwebtoken';

import { Token } from '@shared/types/Token';

import { AppError } from '@errors/AppError';

import { Session } from '../types/Session';

export function currentUserChecker(action: Action): Session {
  const header = action.request.headers.authorization;

  if (!header) throw new AppError('Token not present', 'token.invalid', 401);

  const [, token] = header.split(' ');

  if (!token) throw new AppError('Token not present', 'token.invalid', 401);

  try {
    const user = decode(token) as Token;

    return user;
  } catch {
    throw new AppError('Invalid token format.', 'token.invalid', 401);
  }
}
