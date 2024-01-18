import { TodosState } from '@/types';

export function deleteCompleteTodos(state: TodosState) {
  state.todos = state.todos.filter(({ isComplete }) => !isComplete);
};
