import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentService } from './services/tournament.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './models/tournament.model';
import { SubscriptionController } from '../tournaments/controllers/subscription.controller';
import { SubscriptionService } from '../tournaments/services/subscription.service';
import { Subscription } from '../tournaments/entities/subscription.entity';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'schedule.queue' }),
    SequelizeModule.forFeature([Tournament, Subscription]),
  ],
  controllers: [TournamentController, SubscriptionController],
  providers: [TournamentService, SubscriptionService],
})
export class TournamentModule {}
