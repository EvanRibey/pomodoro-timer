import { FAILED } from '@/common/constants';
import { TodosState } from '@/common/types';

export function errorLoadingTodos(state: TodosState) {
  state.loading = FAILED;
}
