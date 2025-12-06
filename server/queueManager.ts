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
      let lowsUsed = 0;
      // First 4 slots: high priority if available, else low (max 3 lows per batch)
      for (let i = 0; i < 4; i++) {
        if (highs.length) {
          toProcess.push(highs.shift()!);
        } else if (lows.length && lowsUsed < 3) {
          toProcess.push(lows.shift()!);
          lowsUsed++;
        }
      }
      // 5th slot: prefer oldest low (if not already 3), else next high
      if (lows.length && lowsUsed < 3) {
        toProcess.push(lows.shift()!);
        lowsUsed++;
      } else if (highs.length) {
        toProcess.push(highs.shift()!);
      }
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
