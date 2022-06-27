import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Worker } from 'worker_threads';

@Injectable()
export class LoggerStreamService {
  write(log: string) {
    this.createWorker(log);
  }

  createWorker(log: string) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.resolve('src/logger/worker.js'), {
        workerData: { log },
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }

}
