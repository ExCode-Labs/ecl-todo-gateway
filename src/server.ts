import { createApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';

const app = createApp();

app.listen(env.PORT, '0.0.0.0', () => {
  logger.log('info', 'Todo backend started', {
    port: env.PORT,
    environment: env.NODE_ENV,
  });
});
