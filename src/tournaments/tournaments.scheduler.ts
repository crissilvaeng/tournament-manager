import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Job } from 'bull';
import * as moment from 'moment';
import { ScheduleTask } from '../tasks/dto/schedule.task.dto';
import { ScheduleProducer } from '../tasks/schedule.producer';
import { TournamentDto } from './dto/tournament.dto';
import { Game } from './entities/game.entity';
import { Subscription } from './entities/subscription.entity';
import { Tournament } from './entities/tournament.entity';
import { PublisherController } from './publisher/games.publisher.controller';

@Injectable()
export class TournamentsScheduler {
  private readonly logger = new Logger(TournamentsScheduler.name);

  constructor(
    private readonly scheduler: ScheduleProducer,
    private readonly gamePublisher: PublisherController,
  ) {}

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
  async consume(task: ScheduleTask) {
    const tournament = task.payload as TournamentDto;
    this.logger.log(`Processing event. ${JSON.stringify(tournament)}`);
    // var fetchedTornament = await this.tournamentService.findOne(tournament.slug);
    const fetchedTornament = await Tournament.findOne({
      include: [Subscription],
      where: {
        slug: tournament.slug,
      },
    });
    const subscriptions = fetchedTornament.subscriptions;
    for (let i = 0; i < subscriptions.length; i++) {
      for (let y = i + 1; y < subscriptions.length; y++) {
        const game1 = new Game(
          subscriptions[i].agentId,
          subscriptions[y].agentId,
          subscriptions[i].tournamentId,
        );
        const game2 = new Game(
          subscriptions[y].agentId,
          subscriptions[i].agentId,
          subscriptions[i].tournamentId,
        );
        this.gamePublisher.publishNewGame(game1);
        this.gamePublisher.publishNewGame(game2);
      }
    }
  }
}
