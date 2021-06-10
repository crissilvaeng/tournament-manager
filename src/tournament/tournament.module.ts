import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentService } from './Services/Tournament.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './models/tournament.model';

@Module({
  imports: [SequelizeModule.forFeature([Tournament])],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
