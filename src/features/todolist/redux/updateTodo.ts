import { PayloadAction } from '@reduxjs/toolkit';
import { TodoItem, TodosState } from '@/common/types';

export function updateTodo(state: TodosState, action: PayloadAction<Partial<TodoItem>>) {
  const { id, name } = action.payload;

  state.todos.map((todo) => {
    if (todo.id !== id) return todo;
    return {
      ...todo,
      name,
    };
  });
}
