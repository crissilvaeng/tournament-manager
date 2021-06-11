import { ScheduleProducer } from './../tasks/schedule.producer';
import { Injectable, Logger } from '@nestjs/common';
import { TournamentDto } from './dto/tournament.dto';
import * as moment from 'moment';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TournamentsScheduler {
  private readonly logger = new Logger(TournamentsScheduler.name);

  constructor(private readonly scheduler: ScheduleProducer) {}

  async produce(tournament: TournamentDto): Promise<void> {
    const diff = moment(tournament.startTime).diff(moment());
    const delay = diff.valueOf();
    await this.scheduler.process({
      event: 'tournament.started',
      payload: JSON.stringify(TournamentDto),
      delay,
    });
  }

  @OnEvent('tournament.started')
  consume(payload: TournamentDto) {
    this.logger.log(JSON.stringify(payload));
  }
}
