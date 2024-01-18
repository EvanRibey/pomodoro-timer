import { POMO_FORM_DEFAULT_TASKS } from '@/constants/';
import { TodosState } from '@/types';

export const initialState = {
  todos: POMO_FORM_DEFAULT_TASKS,
  loading: 'idle',
} as TodosState;
