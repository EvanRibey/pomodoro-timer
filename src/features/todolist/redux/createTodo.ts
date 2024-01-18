import { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import type { TodoItem, TodosState } from '@/common/types';

export const createTodo = {
  reducer: (state: TodosState, action: PayloadAction<TodoItem>) => {
    state.todos.push(action.payload);
  },
  prepare: (name: string, isComplete: boolean) => {
    const id = nanoid();
    return { payload: { id, name, isComplete } };
  },
};
