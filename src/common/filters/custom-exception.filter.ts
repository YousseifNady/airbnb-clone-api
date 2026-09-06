import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { BaseCustomException } from '../Exceptions/base.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseCustomException) {
      response.status(exception.status).json({
        statusCode: exception.status,
        message: exception.message,
      });
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
