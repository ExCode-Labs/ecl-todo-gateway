import type { Request, Response } from 'express';
import { TodoService } from './todo.service';
import type { CreateTodoRequestDto } from './todo.dto';
import { logger } from '../../config/logger';
import axios from 'axios';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  private extractHeaders(req: Request) {
    return {
      authorization: req.headers.authorization,
      'content-type': req.headers['content-type'],
    };
  }

  private handleError(operation: string, error: unknown, res: Response) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 502;
      const message = error.response?.data?.message ?? 'Backend service error';

      logger.error(`${operation} failed — backend responded ${status}: ${message}`);

      res.status(status).json({ error: message });
      return;
    }

    logger.error(`${operation} failed — unexpected error`, { error });

    res.status(500).json({ error: 'Internal server error' });
  }

  async getTodos(req: Request, res: Response) {
    try {
      const headers = this.extractHeaders(req);
      const todos = await this.todoService.getTodos(headers);
      logger.info(`Returned ${Number(todos?.length || 0)} todos`);

      res.status(200).json({ data: todos });
    } catch (error) {
      this.handleError('getTodos', error, res);
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const headers = this.extractHeaders(req);
      const payload = req.body as CreateTodoRequestDto;
      const data: CreateTodoRequestDto = {
        title: String(payload?.title ?? ''),
      };
      const response = await this.todoService.createTodo(data, headers);

      logger.info('Created todo');

      res.status(201).json({ data: response });
    } catch (error) {
      this.handleError('createTodo', error, res);
    }
  }
}
