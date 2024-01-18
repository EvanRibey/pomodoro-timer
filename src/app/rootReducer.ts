import { default as todoListReducer } from '@/features/todolist/todolistSlice';

export const rootReducer = {
  todos: todoListReducer,
};
