import { POMO_FORM_DEFAULT_TASKS } from '@/common/constants';
import { TodosState } from '@/common/types';

export const initialState = {
  todos: POMO_FORM_DEFAULT_TASKS,
  loading: 'idle',
} as TodosState;
