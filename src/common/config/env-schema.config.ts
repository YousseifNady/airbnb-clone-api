
import { z } from 'zod';

export default z.object({
    APP_NAME: z.string().default('Airbnb Clone Api'),

    APP_ENV: z.enum([
        'local',
        'development',
        'staging',
        'production'
    ]),

    APP_PORT: z.coerce
        .number()
        .int()
        .min(1)
        .max(65535),
});