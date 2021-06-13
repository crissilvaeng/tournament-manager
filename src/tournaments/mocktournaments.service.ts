import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class MockTournamentsService {
  private result = new Promise<TournamentDto>((resolve, reject) => {
    const tournament: TournamentDto = {
      slug: '1',
      title: 'tournament test',
      description: 'description',
      startTime: new Date(),
      status: 'open',
    };
    resolve(tournament);
  });
  constructor() {}
  create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    return this.result;
  }
  findAll(): Promise<TournamentDto[]> {
    throw new Error('Method not implemented.');
  }
  findOne(slug: string): Promise<TournamentDto> {
    return this.result;
  }
  update(slug: string, tournament: UpdateTournamentDto): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
