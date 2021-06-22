import { ConfigModule, ConfigService } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';
import { PublisherModule } from './tournaments/publisher/games.publisher.module';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeSlugify } from 'sequelize-slugify';
import { Subscription } from './tournaments/entities/subscription.entity';
import { TasksModule } from './tasks/tasks.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { Tournament } from './tournaments/entities/tournament.entity';
import { TournamentsModule } from './tournaments/tournaments.module';
import configuration from './config/configuration';

@Module({
  imports: [
    HealthModule,
    MorganModule,
    TournamentsModule,
    PublisherModule,
    TasksModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        redis: config.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    {
      provide: 'SEQUELIZE',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const sequelize = new Sequelize({
          dialect: config.get('database.dialect'),
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          repositoryMode: true,
        });
        sequelize.addModels([Tournament, Subscription]);
        await sequelize.sync();
        SequelizeSlugify.slugifyModel(Tournament, {
          source: ['title'],
          suffixSource: ['timestamp'],
        });
        return sequelize;
      },
    },
  ],
})
export class AppModule {}
