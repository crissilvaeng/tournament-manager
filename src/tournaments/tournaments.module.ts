import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from './entities/subscription.entity';
import { TasksModule } from './../tasks/tasks.module';
import { Tournament } from './entities/tournament.entity';
import { PublisherController } from './publisher/games.publisher.controller';
import { GamesPublisherService } from './publisher/games.publisher.service';
import { EVENT_HUB } from './publisher/nats.type';
import { TournamentsController } from './controllers/tournaments.controller';
import { TournamentsScheduler } from './tournaments.scheduler';
import { TournamentsService } from './services/tournaments.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './services/subscription.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TasksModule,
    SequelizeModule.forFeature([Tournament, Subscription]),
    BullModule.registerQueue({ name: 'schedule.queue' }),
  ],
  controllers: [TournamentsController, SubscriptionController],
  providers: [
    {
      provide: EVENT_HUB,
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
    {
      provide: 'ITournamentsService',
      useClass: TournamentsService,
    },
    TournamentsService,
    TournamentsScheduler,
    SubscriptionService,
    PublisherController,
    GamesPublisherService,
  ],
})
export class TournamentsModule {}
