import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentService } from './services/tournament.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './models/tournament.model';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './services/subscription.service';
import { Subscription } from './models/subscription.model';

@Module({
  imports: [SequelizeModule.forFeature([Tournament, Subscription])],
  controllers: [TournamentController, SubscriptionController],
  providers: [TournamentService, SubscriptionService],
})
export class TournamentModule {}
