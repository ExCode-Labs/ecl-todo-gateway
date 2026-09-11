import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { todoProxy } from './middleware/proxy';
import { env } from './config/env';
import { logger } from './config/logger';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(helmet());

  app.use(
    cors({
      origin: [env.FRONTEND_URL_DEV, env.FRONTEND_URL_UAT, env.FRONTEND_URL_PROD],
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use((req, _res, next) => {
    logger.http(`${req.method} ${req.originalUrl}`);
    next();
  });
  app.get('/health', async (_req, res) => {
    try {
      res.status(200).json({
        status: 'ok',
        service: 'todo-gateway',
        database: 'ok',
      });

      logger.log('info', 'Health Check OK', {
        status: 'ok',
        database: 'ok',
      });
    } catch {
      logger.log('error', 'Health Check KO', {
        status: 'error',
        database: 'error',
      });

      res.status(503).json({
        status: 'error',
        service: 'todo-backend',
        database: 'error',
      });
    }
  });

  app.use(todoProxy);

  return app;
}
