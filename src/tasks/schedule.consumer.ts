import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Job } from 'bull';
import { ScheduleTask } from './dto/schedule.task.dto';

@Processor('schedule.queue')
export class ScheduleConsumer {
  private readonly logger = new Logger(ScheduleConsumer.name);

  constructor(private readonly emitter: EventEmitter2) {}

  @Process()
  async process(job: Job<ScheduleTask>): Promise<void> {
    const success = await this.emitter.emit(job.data.event, job.data);
    if (!success) {
      this.logger.error('Job failed. Retrying...', JSON.stringify(job));
      return await job.retry();
    }
  }
}
