import { combineSlices } from '@reduxjs/toolkit';
import { default as todoListReducer } from '@/features/todolist/todolistSlice';

export const rootReducer = combineSlices(
  todoListReducer,
);
