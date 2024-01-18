import { PayloadAction } from '@reduxjs/toolkit';
import { TodosState } from '../../../types';

export function toggleTodo(state: TodosState, action: PayloadAction<string>) {
  return {
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id !== action.payload) return todo;
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }),
  };
};
