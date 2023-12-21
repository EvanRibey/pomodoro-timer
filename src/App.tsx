import './App.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './utils/customMUITheme'
import PomodoroTimer from './components/PomodoroTimer'
import TodoList from './components/TodoList'
import StickyButtons from './components/StickyButtons'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <PomodoroTimer />
      <TodoList />
      <StickyButtons />
    </ThemeProvider>
  )
}
