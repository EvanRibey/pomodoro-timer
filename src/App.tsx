import { ThemeProvider } from '@mui/material'
import { theme } from './utils/'
import { PomodoroTimer, TodoList, StickyButtons } from './components/';
import './App.less'

export default function App() {
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
