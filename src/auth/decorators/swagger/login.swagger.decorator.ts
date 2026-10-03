import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../../dtos/login.dto';

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login user',
      description: 'Authenticate a user using email and password.',
    }),

    ApiBody({
      type: LoginDto,
    }),

    ApiOkResponse({
      description: 'User logged in successfully.',
    }),

    ApiBadRequestResponse({
      description: 'Invalid request data.',
    }),

    ApiUnauthorizedResponse({
      description: 'Invalid email or password.',
    }),
  );
}
