import { FAILED } from '@/constants';
import { TodosState } from '@/types';

export function errorLoadingTodos(state: TodosState) {
  state.loading = FAILED;
}
