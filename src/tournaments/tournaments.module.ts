import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './entities/tournament.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tournament])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
