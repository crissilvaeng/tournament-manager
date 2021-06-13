import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

export interface ITournamentsService {
  
  create(tournament: CreateTournamentDto): Promise<TournamentDto>;
  findAll(): Promise<TournamentDto[]>;
  findOne(slug: string): Promise<TournamentDto>;
  update(slug: string, tournament: UpdateTournamentDto): Promise<number>;
  
}
