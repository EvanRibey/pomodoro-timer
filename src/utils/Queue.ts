import type { QueueItem } from './types';

export default class Queue {
  queue: QueueItem[];

  constructor() {
    this.queue = [];
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  enqueue(item: QueueItem) {
    if (this.isEmpty()) return null;
    this.queue.push(item);
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
