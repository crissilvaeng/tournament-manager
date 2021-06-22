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
    reject();
  });
  private noWarnings = 'All good!';
  create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    this.noWarnings = JSON.stringify(tournament);
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
      reject();
    });
    return resultArray;
  }
  findOne(slug: string): Promise<TournamentDto> {
    this.noWarnings = JSON.stringify(slug);
    return this.result;
  }
  update(slug: string, tournament: UpdateTournamentDto): Promise<number> {
    this.noWarnings = JSON.stringify(slug) + JSON.stringify(tournament);

    const result = new Promise<number>((resolve, reject) => {
      resolve(1);
      reject();
    });
    this.noWarnings = 'All good!';
    console.log(this.noWarnings);
    return result;
  }
}
