import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournament } from './dto/create-tournament.dto';
import { UpdateTournament } from './dto/update-tournament.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(@Body() createTournamentDto: CreateTournament) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournament,
  ) {
    return this.tournamentsService.update(id, updateTournamentDto);
  }
}
