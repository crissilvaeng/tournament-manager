import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Job } from 'bull';
import * as moment from 'moment';
import { ScheduleTask } from '../tasks/dto/schedule.task.dto';
import { ScheduleProducer } from '../tasks/schedule.producer';
import { TournamentDto } from './dto/tournament.dto';

@Injectable()
export class TournamentsScheduler {
  private readonly logger = new Logger(TournamentsScheduler.name);

  constructor(private readonly scheduler: ScheduleProducer) {}

  async produce(tournament: TournamentDto): Promise<Job<ScheduleTask>> {
    this.logger.log(`Scheduling event. ${JSON.stringify(tournament)}`);
    const diff = moment(tournament.startTime).diff(moment());
    const delay = diff.valueOf();
    return await this.scheduler.process({
      event: 'tournament.started',
      payload: tournament,
      delay,
    });
  }

  @OnEvent('tournament.started', { async: true })
  consume(task: ScheduleTask) {
    const tournament = task.payload as TournamentDto;
    this.logger.log(`Processing event. ${JSON.stringify(tournament)}`);
    // TODO: implement event start event
  }
}
