import { Game } from '../models/game.model';

export interface IGameService {
  getAll(): Promise<Game[]>;

  getById(id: number): Promise<Game>;

  create(game: Game);

  edit(game: Game): Promise<[number, Game[]]>;

  delete(id: number);
}
