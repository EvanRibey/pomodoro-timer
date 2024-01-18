import { ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { theme } from '@/common/utils';
import { useAppDispatch } from '@/app/hooks';
import { PomodoroTimer } from '@/features/timer';
import { TodoList } from '@/features/todolist';
import { loadTodos } from '@/features/todolist/redux/loadTodos';
import { StickyButtons } from '@/features/buttons';
import './App.less';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore -- this should work, but TS continues to complain
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
