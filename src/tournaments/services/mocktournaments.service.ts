import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { TournamentDto } from '../dto/tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';

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

  create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    return this.result;
  }
  findAll(): Promise<TournamentDto[]> {
    const resultArray = new Promise<TournamentDto[]>((resolve, reject) => {
      const tournament: [TournamentDto] = [
        {
          slug: '1',
          title: 'tournament test',
          description: 'description',
          startTime: new Date(),
          status: 'open',
        },
      ];
      resolve(tournament);
    });
    return resultArray;
  }
  findOne(slug: string): Promise<TournamentDto> {
    return this.result;
  }
  update(slug: string, tournament: UpdateTournamentDto): Promise<number> {
    const result = new Promise<number>((resolve, reject) => {
      resolve(1);
    });
    return result;
  }
}
