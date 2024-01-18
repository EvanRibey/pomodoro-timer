import { PENDING } from '@/common/constants';
import { TodosState } from '@/common/types';

export function loadingTodos(state: TodosState) {
  state.loading = PENDING;
}
