import { PENDING } from '@/constants';
import { TodosState } from '@/types';

export function loadingTodos(state: TodosState) {
  state.loading = PENDING;
}
