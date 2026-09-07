import request from 'supertest';
import { createApp } from '../src/app';
import { prisma } from '../src/database/prisma';

describe('Todo backend - /health endpoint', () => {
  const app = createApp();

  afterAll(async () => {
    await prisma.$disconnect();
  });

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