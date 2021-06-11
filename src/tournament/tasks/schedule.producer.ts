import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Job } from 'bull';
import * as moment from 'moment';
import { TournamentSchedule } from './interfaces/tournament.interface';
import { Tournament } from '../models/tournament.model';

@Injectable()
export class ScheduleProducer {
  constructor(@InjectQueue('schedule.queue') private readonly queue: Queue) {}

  process(tournament: Tournament): Promise<Job<TournamentSchedule>> {
    const diff = moment(tournament.startsAt).diff(moment());
    const delay = diff.valueOf();
    return this.queue.add({ id: tournament.id }, { delay });
  }
}
