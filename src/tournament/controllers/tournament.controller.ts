import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Tournament } from '../models/tournament.model';
import { TournamentService } from '../services/tournament.service';
import { ScheduleProducer } from '../tasks/schedule.producer';

@Controller('tournament')
export class TournamentController {
  constructor(
    private tournamentService: TournamentService,
    private producer: ScheduleProducer,
  ) {}

  @Get()
  async getAll(): Promise<Tournament[]> {
    return this.tournamentService.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Tournament> {
    return this.tournamentService.getById(params.id);
  }

  @Post()
  async create(@Body() tournament: Tournament) {
    this.producer.process(tournament);
    return this.tournamentService.create(tournament);
  }

  @Put()
  async edit(@Body() tournament: Tournament): Promise<[number, Tournament[]]> {
    return this.tournamentService.edit(tournament);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.tournamentService.delete(params.id);
  }
}
