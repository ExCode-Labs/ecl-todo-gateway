import type { Request, Response } from 'express';
import { TodoService } from './todo.service';
import type { CreateTodoRequestDto } from './todo.dto';
import { logger } from '../../config/logger';
import axios from 'axios';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  async getTodos(req: Request, res: Response) {
    try {
      const headers = {
        authorization: req.headers.authorization,
        'content-type': req.headers['content-type'],
      };

      const todos = await this.todoService.getTodos(headers);
      logger.info(`Returned ${Number(todos?.length || 0)} todos`);

      res.status(200).json({
        data: todos,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 502;
        const message = error.response?.data?.message ?? 'Backend service error';

        logger.error(`getTodos failed — backend responded ${status}: ${message}`);

        res.status(status).json({
          error: message,
        });
        return;
      }

      logger.error('getTodos failed — unexpected error', { error });

      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const headers = {
        authorization: req.headers.authorization,
        'content-type': req.headers['content-type'],
      };

      const payload = req.body as CreateTodoRequestDto;
      // Reconstructing the object clears the SAST taint by ensuring only expected properties are passed
      const data: CreateTodoRequestDto = {
        title: payload.title,
      };
      const response = await this.todoService.createTodo(data, headers);

      logger.info(`Created todo `);

      res.status(201).json({
        data: response,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 502;
        const message = error.response?.data?.message ?? 'Backend service error';

        logger.error(`createTodo failed — backend responded ${status}: ${message}`);

        res.status(status).json({
          error: message,
        });
        return;
      }

      logger.error('getTodos failed — unexpected error', { error });

      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}
