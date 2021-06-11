import { ScheduleProducer } from './tasks/schedule.producer';
import { ScheduleConsumer } from './tasks/schedule.consumer';
import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentService } from './services/tournament.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './models/tournament.model';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './services/subscription.service';
import { Subscription } from './models/subscription.model';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'schedule.queue' }),
    SequelizeModule.forFeature([Tournament, Subscription]),
  ],
  controllers: [TournamentController, SubscriptionController],
  providers: [
    TournamentService,
    SubscriptionService,
    ScheduleConsumer,
    ScheduleProducer,
  ],
})
export class TournamentModule {}
