import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { BaseCustomException } from '../exceptions/base.exception';

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
    
    if (exception instanceof BadRequestException) {
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

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
