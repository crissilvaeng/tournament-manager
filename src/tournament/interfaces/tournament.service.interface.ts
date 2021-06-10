import { Tournament } from '../models/tournament.model';

export interface ITournamentService {
  getAll(): Promise<Tournament[]>;

  getById(id: number): Promise<Tournament>;

  create(tournament: Tournament);

  edit(tournament: Tournament): Promise<[number, Tournament[]]>;

  delete(id: number);
}
