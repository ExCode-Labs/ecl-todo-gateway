import type { CreateTodoRequestDto, TodoResponseDto } from './todo.dto';
import fetcher from './todoBackendFetcher';
import { logger } from '../../config/logger';

export class TodoService {
  constructor() {}

  async getTodos(headers?: Record<string, string | undefined>) {
    const response = await fetcher.get<TodoResponseDto[] | null>('/', {
      headers: {
        ...(headers?.authorization && { authorization: headers.authorization }),

        ...(headers?.['content-type'] && { 'content-type': headers['content-type'] }),
      },
    });

    logger.info('Todos fetched successfully', {
      service: 'todo-gateway',
      todos: response.data,
    });

    return response.data;
  }
  async createTodo(data: CreateTodoRequestDto, headers?: Record<string, string | undefined>) {
    const response = await fetcher.post<TodoResponseDto | null>('/todos', data, {
      headers: {
        ...(headers?.authorization && { authorization: headers.authorization }),
        ...(headers?.['content-type'] && { 'content-type': headers['content-type'] }),
      },
    });

    return response.data;
  }
}
