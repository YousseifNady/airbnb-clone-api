import { ValidationPipeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const getValidationPipeConfig = (
  configService: ConfigService,
): ValidationPipeOptions => {
  return {
    transform: configService.getOrThrow<boolean>('VALIDATION_TRANSFORM'),
    whitelist: configService.getOrThrow<boolean>('VALIDATION_WHITELIST'),
    forbidNonWhitelisted: configService.getOrThrow<boolean>(
      'VALIDATION_FORBID_NON_WHITELISTED',
    ),
  };
};
