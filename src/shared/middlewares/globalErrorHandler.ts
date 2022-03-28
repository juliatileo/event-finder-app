import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';
import { getReasonPhrase } from 'http-status-codes';

import { AppError } from '@shared/errors/AppError';

import { formatValidationErrors } from '@utils/formatValidationErrors';

type Errors = {
  errors?: ValidationError[];
} & Error;

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    err: Errors,
    _: Request,
    response: Response,
    __: NextFunction
  ): Response {
    if (err?.errors?.every((e) => e instanceof ValidationError))
      return response.status(422).json({
        name: getReasonPhrase(422),
        status: 422,
        message: 'Validation failed',
        errors: formatValidationErrors(err.errors),
      });

    if (err instanceof AppError)
      return response.status(err.statusCode).json({
        name: getReasonPhrase(err.statusCode),
        status: err.statusCode,
        message: err.message,
        code: err.code,
      });

    if (err instanceof HttpError)
      return response.status(err.httpCode).json({
        name: getReasonPhrase(err.httpCode),
        status: err.httpCode,
        message: err.message,
      });

    return response.status(500).json({
      name: getReasonPhrase(500),
      status: 500,
      message: `Internal Server Error - ${err.message}`,
    });
  }
}
