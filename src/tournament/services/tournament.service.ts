import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tournament } from '../models/tournament.model';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament)
    private tournamentModel: typeof Tournament,
  ) {}

  async getAll(): Promise<Tournament[]> {
    return this.tournamentModel.findAll();
  }

  async getById(id: number): Promise<Tournament> {
    return this.tournamentModel.findByPk(id);
  }

  async create(tournament: Tournament): Promise<Tournament> {
    return this.tournamentModel.create(tournament);
  }

  async edit(tournament: Tournament): Promise<[number, Tournament[]]> {
    return this.tournamentModel.update(tournament, {
      where: {
        id: tournament.id,
      },
    });
  }

  async delete(id: number) {
    const tornament: Tournament = await this.getById(id);
    tornament.destroy();
  }
}
