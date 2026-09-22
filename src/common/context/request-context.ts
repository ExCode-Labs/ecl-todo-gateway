import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContext {
  headers: Record<string, string | string[] | undefined>;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();
