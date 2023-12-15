// general props
export interface QueueItem {
  type: string,
  duration: number,
}

export type Nullish = null | undefined;

// Component PropTypes
export interface PomoFormProps {
  onSubmitForm: Function,
}

export interface PomoTimerProps {
  queue: QueueItem[],
  onTimerEnd: Function,
}

// Handler Props
export interface PomodoroTimerFormHandlerProps {
  intervals: number,
}
