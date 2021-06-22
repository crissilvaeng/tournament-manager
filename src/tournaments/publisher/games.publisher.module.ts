import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from '../entities/subscription.entity';
import { PublisherController } from './games.publisher.controller';
import { GamesPublisherService } from './games.publisher.service';
import { EVENT_HUB } from './nats.type';

@Module({
  imports: [SequelizeModule.forFeature([Subscription])],
  controllers: [PublisherController],
  providers: [
    {
      provide: EVENT_HUB,
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
    GamesPublisherService,
  ],
})
export class PublisherModule {}
