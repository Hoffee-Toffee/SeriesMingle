// queueManager.ts
// Centralized request queue for TMDB/IMDB API calls with prioritization and rate limiting

interface QueueItem {
  fn: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  priority: 'high' | 'low';
  enqueuedAt: number;
}

class QueueManager {
  private queue: QueueItem[] = [];
  private processing = false;
  private interval: NodeJS.Timeout | null = null;
  private readonly maxPerTick = 5;
  private readonly tickMs = 100;

  start() {
    if (!this.interval) {
      this.interval = setInterval(() => this.processQueue(), this.tickMs);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  enqueue<T>(fn: () => Promise<T>, priority: 'high' | 'low' = 'low'): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject, priority, enqueuedAt: Date.now() });
    });
  }

  private processQueue() {
    if (this.processing) return;
    this.processing = true;
    try {
      // Sort by enqueuedAt (oldest first)
      this.queue.sort((a, b) => a.enqueuedAt - b.enqueuedAt);
      const highs = this.queue.filter(q => q.priority === 'high');
      const lows = this.queue.filter(q => q.priority === 'low');
      const toProcess: QueueItem[] = [];
      // First 4 slots: high priority if available, else low
      for (let i = 0; i < 4; i++) {
        if (highs.length) toProcess.push(highs.shift()!);
        else if (lows.length) toProcess.push(lows.shift()!);
      }
      // 5th slot: prefer oldest low, else next high
      if (lows.length) toProcess.push(lows.shift()!);
      else if (highs.length) toProcess.push(highs.shift()!);
      // Remove processed from queue
      this.queue = this.queue.filter(q => !toProcess.includes(q));
      // Run all
      toProcess.forEach(item => {
        item.fn().then(item.resolve).catch(item.reject);
      });
    } finally {
      this.processing = false;
    }
  }
}

const queueManager = new QueueManager();
queueManager.start();
export default queueManager;
