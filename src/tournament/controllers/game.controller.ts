import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';

@Controller('Game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  async getAll(): Promise<Game[]> {
    return this.gameService.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Game> {
    return this.gameService.getById(params.id);
  }

  @Post()
  async create(@Body() game: Game) {
    return this.gameService.create(game);
  }

  @Put()
  async edit(@Body() game: Game): Promise<[number, Game[]]> {
    return this.gameService.edit(game);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.gameService.delete(params.id);
  }
}
