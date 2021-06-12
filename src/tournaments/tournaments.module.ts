import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksModule } from './../tasks/tasks.module';
import { Tournament } from './entities/tournament.entity';
import { TournamentsController } from './tournaments.controller';
import { TournamentsScheduler } from './tournaments.scheduler';
import { TournamentsService } from './tournaments.service';

@Module({
  imports: [TasksModule, SequelizeModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentsScheduler],
})
export class TournamentsModule {}
