import {
  POMODORO_TIMER_BREAK,
  POMODORO_TIMER_BREAK_LONG,
  POMODORO_TIMER_FOCUS,
  POMODORO_TIMER_LONG_MULTIPLIER,
  QUEUE_TYPE_BREAK,
  QUEUE_TYPE_BREAK_LONG,
  QUEUE_TYPE_FOCUS,
} from '../constants';
import { QueueItem } from '../types/';

/**
 * Creates a queue list combined of the respective work/break periods
 * @param {number} intervals The number of working intervals
 * @param {isLong} isLong If the intervals are long or doubled
 * @returns {QueueItems[]} Returns an array containing work and break intervals
 */
export function generateQueueList(intervals: number, isLong: boolean): QueueItem[] {
  return Array(intervals * 2).fill(undefined).map((_, index: number) => {
    let type = QUEUE_TYPE_FOCUS;
    const multiplier = isLong ? POMODORO_TIMER_LONG_MULTIPLIER : 1;
    if (index % 2 !== 0) type = QUEUE_TYPE_BREAK;
    if ((index+1) % 8 === 0) type = QUEUE_TYPE_BREAK_LONG;

    switch (type) {
      case QUEUE_TYPE_BREAK:
        return {
          type,
          duration: POMODORO_TIMER_BREAK * multiplier,
        };

      case QUEUE_TYPE_BREAK_LONG:
        return {
          type,
          duration: POMODORO_TIMER_BREAK_LONG * multiplier,
        };

      default:
        return {
          type,
          duration: POMODORO_TIMER_FOCUS * multiplier,
        };
    }
  });
}
