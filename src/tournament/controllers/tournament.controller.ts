import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Tournament } from '../models/tournament.model';
import { ITournamentService } from '../interfaces/tournament.service.interface';

@Controller('tournament')
export class TournamentController {
  constructor(
    @Inject('ITournamentService') private serviceInterface: ITournamentService,
  ) {}

  @Get()
  async getAll(): Promise<Tournament[]> {
    return this.serviceInterface.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Tournament> {
    return this.serviceInterface.getById(params.id);
  }

  @Post()
  async create(@Body() tournament: Tournament) {
    return this.serviceInterface.create(tournament);
  }

  @Put()
  async edit(@Body() tournament: Tournament): Promise<[number, Tournament[]]> {
    return this.serviceInterface.edit(tournament);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.serviceInterface.delete(params.id);
  }
}
