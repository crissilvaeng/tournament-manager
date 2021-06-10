import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from '../Models/game.model';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game)
    private gameModel: typeof Game,
  ) {}

  async getAll(): Promise<Game[]> {
    return this.gameModel.findAll();
  }

  async getById(id: number): Promise<Game> {
    return this.gameModel.findByPk(id);
  }

  async create(game: Game) {
    this.gameModel.create(game);
  }

  async edit(game: Game): Promise<[number, Game[]]> {
    return this.gameModel.update(game, {
      where: {
        id: game.id,
      },
    });
  }

  async delete(id: number) {
    const game: Game = await this.getById(id);
    game.destroy();
  }
}
