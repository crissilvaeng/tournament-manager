import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './Services/game.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './models/game.model';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Game])],
  controllers: [GameController],
  providers: [
    {
      provide: 'IGameService',
      useClass: GameService,
    },
  ],
})
export class GameModule {}
