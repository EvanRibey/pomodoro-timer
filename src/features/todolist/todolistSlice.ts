import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './redux/initialState';
import { default as reduxReducers } from './redux/reducers';
import { default as reduxExtraReducers } from './redux/extraReducers';

const slice = createSlice({
  name: 'todolist',
  initialState,
  reducers: reduxReducers,
  extraReducers: reduxExtraReducers,
});

export const {
  createTodo,
  deleteTodo,
  deleteCompleteTodos,
  toggleTodo,
  completeTodos,
  updateTodo,
} = slice.actions;

export default slice;
