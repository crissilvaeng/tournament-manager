import { Job } from 'bull';
import { Processor, Process } from '@nestjs/bull';
import { TournamentSchedule } from './interfaces/tournament.interface';
import { Logger } from '@nestjs/common';
import { TournamentService } from '../services/tournament.service';
import { Tournament } from '../models/tournament.model';

@Processor('schedule.queue')
export class ScheduleConsumer {
  private readonly logger = new Logger(ScheduleConsumer.name);

  constructor(private readonly tournament: TournamentService) {}

  @Process()
  async process(job: Job<TournamentSchedule>): Promise<void> {
    // TODO: implements tournamanent start behaviour
    const tournament = await Tournament.findOne({
      where: {
        id: job.data.id,
      },
    });
    this.logger.log(tournament);
  }
}
