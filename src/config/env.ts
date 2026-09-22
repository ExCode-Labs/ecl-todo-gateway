import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  PORT: z.coerce.number().default(3000),

  // Frontend
  FRONTEND_URL: z.url(),

  // Backend
  BACKEND_URL: z.url(),
});

export const env = envSchema.parse(process.env);
