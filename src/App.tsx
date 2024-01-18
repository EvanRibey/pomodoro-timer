import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { theme } from '@/utils';
import { useAppDispatch } from '@/app/hooks';
import { PomodoroTimer, TodoList, StickyButtons } from '@/features';
import './App.less';
import { loadTodos } from './features/todolist/redux/loadTodos';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="center-container">
        <PomodoroTimer />
        <TodoList />
      </div>
      <StickyButtons />
    </ThemeProvider>
  )
}
