import type { CreateTodoRequestDto, TodoResponseDto } from './todo.dto';
import { logger } from '../../config/logger';
import { TODO_PATHS } from './todo.constant';
import { Fetcher } from '../../common/http/fetcher';
import { env } from '../../config/env';

export class TodoService {
  private readonly fetcher;
  constructor() {
    this.fetcher = new Fetcher(env.BACKEND_URL);
  }

  async getTodos() {
    const todos = await this.fetcher.get<TodoResponseDto[] | null>(TODO_PATHS.todos);

    logger.info('Todos fetched successfully');

    return todos;
  }
  async createTodo(data: CreateTodoRequestDto) {
    const response = await this.fetcher.post<TodoResponseDto | null>(TODO_PATHS.todos, data);

    return response;
  }
}
