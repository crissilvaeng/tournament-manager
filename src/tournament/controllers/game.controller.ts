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
import { Game } from '../models/game.model';
import { IGameService } from '../interfaces/Game.service.interface';

@Controller('Game')
export class GameController {
  constructor(@Inject('IGameService') private serviceInterface: IGameService) {}

  @Get()
  async getAll(): Promise<Game[]> {
    return this.serviceInterface.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Game> {
    return this.serviceInterface.getById(params.id);
  }

  @Post()
  async create(@Body() game: Game) {
    return this.serviceInterface.create(game);
  }

  @Put()
  async edit(@Body() game: Game): Promise<[number, Game[]]> {
    return this.serviceInterface.edit(game);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.serviceInterface.delete(params.id);
  }
}
