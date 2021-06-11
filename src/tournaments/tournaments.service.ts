import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { TournamentsScheduler } from './tournaments.scheduler';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectModel(Tournament)
    private readonly repository: typeof Tournament,
    private readonly scheduler: TournamentsScheduler,
  ) {}

  async create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    const result = await this.repository.create({ ...tournament });
    await this.scheduler.produce(result);
    return result;
  }

  async findAll(): Promise<TournamentDto[]> {
    return await this.repository.findAll();
  }

  async findOne(slug: string): Promise<TournamentDto> {
    return await this.repository.findOne({ where: { slug } });
  }

  async update(slug: string, tournament: UpdateTournamentDto): Promise<number> {
    return await this.repository
      .update({ ...tournament }, { where: { slug } })
      .then((result) => result[0]);
  }
}
