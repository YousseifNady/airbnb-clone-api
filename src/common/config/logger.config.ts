import { ConsoleLogger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_ENV_LOCAL } from './env-schema.config';

export const setupLogger = (app: INestApplication): void => {
    const configService = app.get(ConfigService);
    const appEnv = configService.get<string>('APP_ENV');

    app.useLogger(
        new ConsoleLogger({
            json: appEnv !== APP_ENV_LOCAL,
        }),
    );
};