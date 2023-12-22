// types of pomodoro states
export const QUEUE_TYPE_FOCUS = 'focus';
export const QUEUE_TYPE_BREAK = 'break';
export const QUEUE_TYPE_BREAK_LONG = 'longBreak';

// storage keys
export const STORAGE_KEY_TODO_LIST = 'todoListItems';

// form names
export const TODO_FORM_NAME_CHECKBOX = 'isComplete';
export const TODO_FORM_NAME_TEXTFIELD = 'name';
export const POMO_FORM_NAME_TEXTFIELD = 'interval-timer';
export const POMO_FORM_NAME_CHECKBOX = 'is-long-pomo-checked';

// string descriptions, taken out for code read-ability
export const POMO_STATE_TITLE_BREAK = 'Break Time';
export const POMO_STATE_TITLE_BREAK_LONG = '(Long) Break Time';
export const POMO_STATE_TITLE_FOCUS = 'Focus Time';
export const POMO_STATE_DESCRIPTION_BREAK = 'Get up and stretch, maybe grab some water';
export const POMO_STATE_DESCRIPTION_BREAK_LONG = 'Step away for a bit, maybe grab a cup of tea or coffee';
export const POMO_STATE_DESCRIPTION_FOCUS = 'Sit and breathe; you got this';

export const POMO_FORM_LABEL_COUNT = 'Pomodoro Sessions';
export const POMO_FORM_LABEL_LONG_CYCLES = 'Use Long Pomodoro Cycles';
export const POMO_FORM_HELPER_COUNT = 'Every fourth break will be longer';
export const POMO_FORM_HELPER_LONG_CYCLES = 'A long cycle is 50 mins of focus followed by a 10 min break';

export const POMO_TIMER_TOOLTIP_STOP = 'Stop Timer';
export const POMO_TIMER_ARIA_LABEL = 'stop timer';

export const TODO_FORM_HELPER_TEXT_FIELD = 'Return ⏎ to add to list';

export const LOFI_BUTTON_TOOLTIP_PAUSE = 'Pause Music';
export const LOFI_BUTTON_TOOLTIP_PLAY = 'Play Music';
export const LOFI_BUTTON_TOOLTIP_FIRST_TIME_PLAY = 'Play Lofi Girl Music';
export const LOFI_BUTTON_ARIA_LABEL = 'play lofi music';

export const LOFI_GIRL_CREDIT = 'Provided by Lofi Girl';

// magic numbers
export const POMODORO_INITIAL_INTERVAL = 4;

export const POMODORO_TIMER_FOCUS = 25;
export const POMODORO_TIMER_BREAK = 5;
export const POMODORO_TIMER_BREAK_LONG = 15;

export const POMODORO_TIMER_LONG_MULTIPLIER = 2;

export const POMODORO_TIMER_HEIGHT = 292; // accounts for border size of parent

export const MINUTES_IN_SECOND = 60;

// initial values
export const POMO_FORM_DEFAULT_TASKS = [{ id: 'default', name: 'Make todo list', isComplete: true }];

const appName = 'Pomodoro Timer';
export const APP_TITLE = `${appName} | Time Management & Task List`;
export const APP_TITLE_FOCUS = `Focus - ${appName}`;
export const APP_TITLE_BREAK = `Break - ${appName}`;
export const APP_TITLE_BREAK_LONG = `Long Break - ${appName}`;
