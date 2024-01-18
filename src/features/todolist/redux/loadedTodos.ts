import { PayloadAction } from '@reduxjs/toolkit';
import { SUCCEEDED } from '@/common/constants';
import { TodoItem, TodosState } from '@/common/types';

export function loadedTodos(state: TodosState, action: PayloadAction<TodoItem[]>) {
  state.todos = action.payload;
  state.loading = SUCCEEDED;
}
