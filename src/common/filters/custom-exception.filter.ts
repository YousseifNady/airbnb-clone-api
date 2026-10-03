import {
  ArgumentsHost,
  BadRequestException as NestBadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

import { BaseCustomException } from '../exceptions/base.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
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

    this.logUnhandledException(exception, request);

    console.error('Unhandled exception:', exception);

    return response.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }

  private logUnhandledException(exception: unknown, request: Request) {
    const isError = exception instanceof Error;
    const message = isError
      ? exception.message
      : 'Unknown internal server error';

    const stackArray =
      isError && exception.stack
        ? exception.stack.split('\n').map((line) => line.trim())
        : undefined;

    this.logger.error(`Unhandled Exception: ${message}`, {
      path: request.url,
      method: request.method,
      stack: stackArray,
    });
  }
}
