import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.nterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);

  await app.listen(configService.getOrThrow<number>('APP_PORT'));
}

void bootstrap();
