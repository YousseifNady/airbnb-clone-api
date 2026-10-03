import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { setupLogger } from './common/config/logger.config';
import { setupSwagger } from './common/config/swagger.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create<INestApplication>(AppModule);

    const configService = app.get(ConfigService);

    setupLogger(app);

    setupSwagger(app);

    await app.listen(configService.getOrThrow<number>('APP_PORT'));
  } catch (err) {
    console.error('Failed to start application:', err);
    process.exit(1);
  }
}

void bootstrap();
