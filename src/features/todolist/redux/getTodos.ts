import { TodosState } from '../../../types';

export function getTodos(state: TodosState) {
  return state.todos;
};
