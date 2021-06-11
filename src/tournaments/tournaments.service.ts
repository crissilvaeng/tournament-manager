import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectModel(Tournament)
    private repository: typeof Tournament,
  ) {}

  async create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    return await this.repository.create({ ...tournament });
  }

  async findAll(): Promise<TournamentDto[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<TournamentDto> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(
    id: string,
    tournament: UpdateTournamentDto,
  ): Promise<TournamentDto> {
    return await this.repository.findOne({ where: { id } }).then((data) => {
      if (!data) {
        return data;
      }
      return data.update({ ...tournament });
    });
  }
}
