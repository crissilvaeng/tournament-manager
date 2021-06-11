import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TournamentDto } from './dto/tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { TournamentsService } from './tournaments.service';

@ApiTags('Tournaments')
@Controller('tournaments')
@UseInterceptors(ClassSerializerInterceptor)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(
    @Body() createTournamentDto: CreateTournamentDto,
  ): Promise<TournamentDto> {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Get()
  findAll(): Promise<TournamentDto[]> {
    return this.tournamentsService.findAll();
  }

  @Get(':slug')
  @ApiNotFoundResponse()
  async findOne(@Param('slug') slug: string): Promise<TournamentDto> {
    const tournament = await this.tournamentsService.findOne(slug);
    if (!tournament) {
      throw new NotFoundException();
    }
    return tournament;
  }

  @HttpCode(204)
  @Patch(':slug')
  @ApiNoContentResponse()
  async update(
    @Param('slug') slug: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ): Promise<void> {
    await this.tournamentsService.update(slug, updateTournamentDto);
  }
}
