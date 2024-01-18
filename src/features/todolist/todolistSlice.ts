import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './redux/initialState';
import { default as reduxSelectors } from './redux/selectors';
import { default as reduxReducers } from './redux/reducers';
import { default as reduxExtraReducers } from './redux/extraReducers';

const { actions, reducer, selectors } = createSlice({
  name: 'todos',
  initialState,
  reducers: reduxReducers,
  selectors: reduxSelectors,
  extraReducers: reduxExtraReducers,
});

export const {
  createTodo,
  deleteTodo,
  deleteCompleteTodos,
  toggleTodo,
  updateTodo,
} = actions;
export const { todos } = selectors;

export default reducer;
