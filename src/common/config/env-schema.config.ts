import { z } from 'zod';

export default z.object({
  APP_NAME: z.string().default('Airbnb Clone Api'),

  APP_ENV: z.enum(['local', 'development', 'staging', 'production']),

  APP_PORT: z.coerce.number().int().min(1).max(65535),

  MONGO_HOST: z.string().default('localhost'),

  MONGO_PORT: z.coerce.number().int().min(1).max(65535),

  MONGO_DB: z.string().default('airbnb-clone-api'),

  JWT_SECRET: z.string(),

  JWT_EXPIRES_IN: z.string(),

  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
});
