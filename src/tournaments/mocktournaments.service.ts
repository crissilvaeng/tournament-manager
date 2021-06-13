import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class MockTournamentsService {
  constructor(
  ) {}
  create(tournament: CreateTournamentDto): Promise<TournamentDto> {
    const result = new Promise<TournamentDto>((resolve, reject) => {
      const tournament: TournamentDto = {'slug': '1', 'title': 'tournament test', 'description': 'description', 'startTime': new Date(), 'status': 'open'}
    resolve(tournament)
    });
    return result
  }
  findAll(): Promise<TournamentDto[]> {
    throw new Error('Method not implemented.');
  }
  findOne(slug: string): Promise<TournamentDto> {
    throw new Error('Method not implemented.');
  }
  update(slug: string, tournament: UpdateTournamentDto): Promise<number> {
    throw new Error('Method not implemented.');
  }
  
}
