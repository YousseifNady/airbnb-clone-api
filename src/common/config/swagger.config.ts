import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
    const configService = app.get(ConfigService);

    const title = configService.getOrThrow<string>('SWAGGER_TITLE');
    const description = configService.getOrThrow<string>('SWAGGER_DESCRIPTION');
    const version = configService.getOrThrow<string>('SWAGGER_VERSION');
    const swaggerPath = configService.getOrThrow<string>('SWAGGER_PATH');

    const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerPath, app, documentFactory);
};