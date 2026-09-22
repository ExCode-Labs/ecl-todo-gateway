import type { Request, Response } from 'express';
import { TodoService } from './todo.service';
import type { CreateTodoRequestDto } from './todo.dto';
import { logger } from '../../config/logger';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  async getTodos(_req: Request, res: Response) {
    const todos = await this.todoService.getTodos();
    logger.info(`Returned ${todos?.length} todos`);

    res.status(200).json({ data: todos });
  }

  async createTodo(req: Request, res: Response) {
    const payload = req.body as CreateTodoRequestDto;
    const data: CreateTodoRequestDto = {
      title: String(payload?.title ?? ''),
    };
    const response = await this.todoService.createTodo(data);

    logger.info('Created todo');

    res.status(201).json({ data: response });
  }
}
