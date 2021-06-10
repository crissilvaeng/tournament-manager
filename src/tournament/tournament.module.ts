import { Module } from '@nestjs/common';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentService } from './Services/Tournament.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tournament } from './models/tournament.model';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Tournament])],
  controllers: [TournamentController],
  providers: [
    {
      provide: 'ITournamentService',
      useClass: TournamentService,
    },
  ],
})
export class TournamentModule {}
