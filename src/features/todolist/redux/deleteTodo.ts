import { PayloadAction } from '@reduxjs/toolkit';
import { TodosState } from '@/common/types';

export function deleteTodo(state: TodosState, action: PayloadAction<string>) {
  state.todos = state.todos.filter(({ id }) => id !== action.payload);
};
