import { Router } from 'express';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const todoService = new TodoService();
const todoController = new TodoController(todoService);

const router = Router();

router.get('/', todoController.getTodos.bind(todoController));

export default router;
