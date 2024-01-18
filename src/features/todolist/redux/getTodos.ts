import { TodosState } from '@/common/types';

export function getTodos(state: TodosState) {
  return state.todos;
};
