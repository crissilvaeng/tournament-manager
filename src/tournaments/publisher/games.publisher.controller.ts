import { Controller, Post } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GamesPublisherService } from './games.publisher.service';

@Controller()
export class PublisherController {
  constructor(private readonly publisherService: GamesPublisherService) {}

  @Post()
  publishNewGame(game: Game): { result: { success: boolean } } {
    const result = this.publisherService.publish(game);
    return {
      result,
    };
  }
}
