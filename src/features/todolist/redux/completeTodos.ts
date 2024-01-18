import { TodosState } from '@/common/types';

export function completeTodos(state: TodosState) {
  state.todos = state.todos.map((todoItem) => {
    return {
      ...todoItem,
      isComplete: true,
    };
  });
}
