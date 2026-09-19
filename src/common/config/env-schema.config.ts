import { z } from 'zod';

export const APP_ENV_LOCAL = 'local';
export const APP_ENV_DEVELOPMENT = 'development';
export const APP_ENV_STAGING = 'staging';
export const APP_ENV_PRODUCTION = 'production';

export default z.object({
  APP_NAME: z.string().default('Airbnb Clone Api'),
  APP_ENV: z.enum([APP_ENV_LOCAL, APP_ENV_DEVELOPMENT, APP_ENV_STAGING, APP_ENV_PRODUCTION]),
  APP_PORT: z.coerce.number().int().min(1).max(65535),

  MONGO_HOST: z.string().default('localhost'),
  MONGO_PORT: z.coerce.number().int().min(1).max(65535),
  MONGO_DB: z.string().default('airbnb-clone-api'),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
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
});
