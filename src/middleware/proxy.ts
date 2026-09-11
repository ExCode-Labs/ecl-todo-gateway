import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from '../config/env';
import { logger } from '../config/logger';

export const todoProxy = createProxyMiddleware({
  target: env.TODO_BACKEND_URL,
  changeOrigin: true,
  pathFilter: '/api/todo',
  logger,
  on: {
    error: (err, _req, res) => {
      logger.error('Proxy error', {
        message: err.message,
        code: (err as NodeJS.ErrnoException).code,
      });

      (res as import('http').ServerResponse)
        .writeHead(502, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ status: 'error', message: 'Upstream unavailable' }));
    },
    proxyReq: (proxyReq, req) => {
      logger.debug(`[proxy] ${req.method} ${req.url} -> ${env.TODO_BACKEND_URL}${req.url}`);
    },
    proxyRes: (proxyRes, req) => {
      logger.debug(`[proxy] ${req.method} ${req.url} -> ${proxyRes.statusCode}`);
    },
  },
});
