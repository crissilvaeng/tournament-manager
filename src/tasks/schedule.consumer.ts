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
    const success = this.emitter.emit(
      job.data.event,
      JSON.parse(job.data.payload),
    );
    this.logger.log(`Processing: ${JSON.stringify(job)}`);
    if (!success) {
      this.logger.error(
        `Job failed: ${JSON.stringify(job.data)}. Scheduling retry...`,
      );
      return await job.retry();
    }
  }
}
