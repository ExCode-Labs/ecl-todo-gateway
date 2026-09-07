import winston from 'winston';

const isProd = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  defaultMeta: { service: 'todo-gateway' },
  transports: [
    new winston.transports.Console({
      format: isProd
        ? // Production: structured JSON logs
          winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
          )
        : // Development: colorized, human-readable logs
          winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
              const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
              return `${timestamp} [${level}]: ${stack || message} ${metaString}`;
            }),
          ),
    }),
  ],
});
