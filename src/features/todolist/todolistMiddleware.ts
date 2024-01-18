import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  createTodo, deleteTodo, toggleTodo, updateTodo
} from './todolistSlice';
import { STORAGE_KEY_TODO_LIST } from '@/common/constants';
import { RootState } from '@/app/store';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(createTodo, deleteTodo, toggleTodo, updateTodo),
  effect: (_action, { getState }) => {
    const { todolist: { todos }} = getState() as RootState;
    localStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(todos));
  },
});

export const { middleware } = listenerMiddleware;
