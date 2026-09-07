import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().default(3000),

  // Frontend
  FRONTEND_URL_DEV: z.string().url(),
  FRONTEND_URL_UAT: z.string().url(),
  FRONTEND_URL_PROD: z.string().url(),
});

export const env = envSchema.parse(process.env);
