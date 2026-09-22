import type { Request, Response, NextFunction } from 'express';
import { requestContext } from '../common/context/request-context';

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  requestContext.run(
    {
      headers: req.headers,
    },
    () => {
      next();
    },
  );
};
