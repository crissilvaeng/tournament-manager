import { TasksModule } from './../tasks/tasks.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './entities/tournament.entity';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { TournamentsScheduler } from './tournaments.scheduler';

@Module({
  imports: [TasksModule, SequelizeModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentsScheduler],
})
export class TournamentsModule {}
