import request from 'supertest';
import { createApp } from '../src/app';

describe('Todo backend - /health endpoint', () => {
  const app = createApp();

  it('should return 200 when the application and database are healthy', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      status: 'ok',
      service: 'todo-backend',
      database: 'ok',
    });
  });
});
