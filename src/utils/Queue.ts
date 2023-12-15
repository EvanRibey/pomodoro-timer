import type { QueueItem } from './types';

export default class Queue {
  queue: QueueItem[];

  constructor() {
    this.queue = [];
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  enqueue(items: QueueItem | QueueItem[]) {
    const arrayQueueItems = Array.isArray(items) ? items : [items];
    this.queue.push(...arrayQueueItems);
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.queue.shift();
  }

  peek() {
    if (this.isEmpty()) return null;
    return { ...this.queue[0] };
  }
}
