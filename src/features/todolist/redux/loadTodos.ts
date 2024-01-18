import { STORAGE_KEY_TODO_LIST } from '@/constants';
import { TodoItem } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadTodos = createAsyncThunk<TodoItem[], void>(
  'todos/loadTodos',
  async () => {
    const cachedStorageItems = localStorage.getItem(STORAGE_KEY_TODO_LIST);
    return JSON.parse(cachedStorageItems || '');
  },
);
