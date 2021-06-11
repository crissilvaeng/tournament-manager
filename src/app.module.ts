import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { SequelizeSlugify } from 'sequelize-slugify';
import { Sequelize } from 'sequelize-typescript';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { Tournament } from './tournaments/entities/tournament.entity';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [
    HealthModule,
    MorganModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      envFilePath: '.development.env',
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
    TournamentsModule,
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
        sequelize.addModels([Tournament]);
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
