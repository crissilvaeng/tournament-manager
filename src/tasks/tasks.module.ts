import { Module } from '@nestjs/common';
import { ScheduleProducer } from './schedule.producer';
import { ScheduleConsumer } from './schedule.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'schedule.queue' })],
  providers: [ScheduleConsumer, ScheduleProducer],
  exports: [ScheduleProducer],
})
export class TasksModule {}
