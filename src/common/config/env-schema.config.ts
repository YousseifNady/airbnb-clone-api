import { z } from 'zod';
import { AppEnv } from '../enums/env.enum';

export default z
  .object({
    APP_NAME: z.string().default('Airbnb Clone Api'),
    APP_ENV: z.enum(AppEnv.asArray()).default(AppEnv.LOCAL),
    APP_PORT: z.coerce.number().int().min(1).max(65535),

    MONGO_HOST: z.string().default('localhost'),
    MONGO_PORT: z.coerce.number().int().min(1).max(65535),
    MONGO_DB: z.string().default('airbnb-clone-api'),

    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
    JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),

    // Validation Pipe Configurations
    VALIDATION_TRANSFORM: z.coerce.boolean().default(true),
    VALIDATION_WHITELIST: z.coerce.boolean().default(true),
    VALIDATION_FORBID_NON_WHITELISTED: z.coerce.boolean().default(true),

    // Swagger Configurations
    SWAGGER_TITLE: z.string().default('Airbnb Clone API'),
    SWAGGER_DESCRIPTION: z.string().default('The Airbnb Clone API description'),
    SWAGGER_VERSION: z.string().default('1.0.0'),
    SWAGGER_PATH: z.string().default('api/docs'),

    SYSTEM_ADMIN_NAME: z.string(),
    SYSTEM_ADMIN_EMAIL: z.string(),
    SYSTEM_ADMIN_PASSWORD: z.string(),

    STORAGE_DRIVER: z.string().default('file'),

    AWS_REGION: z.string().optional(),
    AWS_ACCESS_KEY_ID: z.string().optional(),
    AWS_SECRET_ACCESS_KEY: z.string().optional(),
    AWS_S3_BUCKET: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.STORAGE_DRIVER === 's3') {
      const awsFields = [
        'AWS_REGION',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_S3_BUCKET',
      ] as const;

      awsFields.forEach((field) => {
        if (!data[field]) {
          ctx.addIssue({
            code: 'custom',
            message: `${field} is required when STORAGE_DRIVER is set to s3`,
            path: [field],
          });
        }
      });
    }
  });
