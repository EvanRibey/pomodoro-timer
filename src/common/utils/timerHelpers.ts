import { MINUTES_IN_SECOND } from '../constants';

export function minutesToSeconds(minutes: number) {
  return minutes * MINUTES_IN_SECOND;
}
