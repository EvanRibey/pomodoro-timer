// general props
export interface QueueItem {
  type: string,
  duration: number,
}

export interface TodoItem {
  name: string,
  isComplete: boolean,
}

export type Nullish = null | undefined;

// Component PropTypes
export interface PomoFormProps {
  onSubmitForm: Function,
}

export interface PomoTimerProps {
  queue: QueueItem[],
  onTimerStart: Function,
  onTimerEnd: Function,
}

export interface TodoProps {
  onComplete: Function,
  onDelete: Function,
  onUpdate: Function,
  todo: TodoItem,
}

export interface TodosProps {
  onCompleteTodo: Function,
  onDeleteTodo: Function,
  onUpdateTodo: Function,
  todos: TodoItem[],
}

export interface TodoFormProps {
  onCreateTodo: Function,
}

// Handler Props
export interface PomodoroTimerFormHandlerProps {
  intervals: number,
  isLong: boolean,
}
