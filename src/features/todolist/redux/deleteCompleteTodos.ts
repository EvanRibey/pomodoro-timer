import { TodosState } from '@/common/types';

export function deleteCompleteTodos(state: TodosState) {
  state.todos = state.todos.filter(({ isComplete }) => !isComplete);
};
