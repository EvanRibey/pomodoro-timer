import { middleware as todolistMiddleware } from '@/features/todolist/todolistMiddleware';

export const rootMiddleware = [
  todolistMiddleware,
];
