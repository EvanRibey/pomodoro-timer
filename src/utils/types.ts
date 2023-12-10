import { QUEUE_TYPE_FOCUS, QUEUE_TYPE_BREAK } from './constants';

type QueueItemType = typeof QUEUE_TYPE_FOCUS | typeof QUEUE_TYPE_BREAK;

export interface QueueItem {
  type: QueueItemType,
  duration: number,
}
