import type { Request, Response } from 'express';
import { TodoService } from './todo.service';
import { logger } from '../../config/logger';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  async getTodos(_req: Request, res: Response) {
    const todos = await this.todoService.getTodos();
    logger.log('info', `returned all todos`);

    res.status(200).json({
      data: todos,
    });
  }
}
