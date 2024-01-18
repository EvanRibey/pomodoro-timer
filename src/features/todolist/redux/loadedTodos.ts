import { SUCCEEDED } from '@/constants';
import { TodoItem, TodosState } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';

export function loadedTodos(state: TodosState, action: PayloadAction<TodoItem[]>) {
  state.todos = action.payload;
  state.loading = SUCCEEDED;
}
