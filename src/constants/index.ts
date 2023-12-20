// types of pomodoro states
export const QUEUE_TYPE_FOCUS = 'focus';
export const QUEUE_TYPE_BREAK = 'break';
export const QUEUE_TYPE_BREAK_LONG = 'longBreak';

// string descriptions, taken out for code read-ability
export const POMO_STATE_TITLE_BREAK = 'Break Time';
export const POMO_STATE_TITLE_BREAK_LONG = '(Long) Break Time';
export const POMO_STATE_TITLE_FOCUS = 'Focus Time';
export const POMO_STATE_DESCRIPTION_BREAK = 'Get up and stretch, maybe grab some water';
export const POMO_STATE_DESCRIPTION_BREAK_LONG = 'Step away for a bit, maybe grab a cup of tea or coffee';
export const POMO_STATE_DESCRIPTION_FOCUS = 'Sit and breathe; you got this';

export const POMO_FORM_LABEL_COUNT = 'Pomodoro sessions';
export const POMO_FORM_LABEL_LONG_CYCLES = 'Use Long Pomodoro Cycles';
export const POMO_FORM_HELPER_COUNT = 'The fourth break will be longer at 15 mins';
export const POMO_FORM_HELPER_LONG_CYCLES = 'A long cycle is 50 mins of focus followed by a 10 min break';

// magic numbers
export const POMODORO_INITIAL_INTERVAL = 4;

export const POMODORO_TIMER_FOCUS = 25;
export const POMODORO_TIMER_BREAK = 5;
export const POMODORO_TIMER_BREAK_LONG = 15;

export const POMODORO_TIMER_LONG_MULTIPLIER = 2;

export const POMODORO_TIMER_HEIGHT = 292; // accounts for border size of parent

export const MINUTES_IN_SECOND = 60;
