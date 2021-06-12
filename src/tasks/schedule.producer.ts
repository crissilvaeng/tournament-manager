import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Job } from 'bull';
import { ScheduleTask } from './dto/schedule.task.dto';

@Injectable()
export class ScheduleProducer {
  constructor(@InjectQueue('schedule.queue') private readonly queue: Queue) {}

  process(task: ScheduleTask): Promise<Job<ScheduleTask>> {
    return this.queue.add(task, { delay: task.delay });
  }
}
