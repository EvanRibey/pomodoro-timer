import { ThemeProvider } from '@mui/material'
import { theme } from './utils/customMUITheme'
import PomodoroTimer from './components/PomodoroTimer'
import TodoList from './components/TodoList'
import StickyButtons from './components/StickyButtons'
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
