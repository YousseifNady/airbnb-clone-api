import {
  ArgumentsHost,
  BadRequestException as NestBadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

import { BaseCustomException } from '../exceptions/base.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseCustomException) {
      return response.status(exception.status).json({
        success: false,
        message: exception.message,
      });
    }

    if (exception instanceof NestBadRequestException) {
      const exceptionResponse = exception.getResponse();

      const errors =
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
          ? exceptionResponse.message
          : exception.message;

      return response.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    console.error('Unhandled exception:', exception);

    return response.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
