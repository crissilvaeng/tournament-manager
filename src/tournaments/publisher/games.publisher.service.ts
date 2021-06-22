import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Game } from '../entities/game.entity';
import { EVENT_HUB } from './nats.type';

@Injectable()
export class GamesPublisherService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(EVENT_HUB) private readonly client: ClientProxy) {}

  async onModuleInit(): Promise<void> {
    return this.client.connect();
  }

  onModuleDestroy(): void {
    return this.client.close();
  }

  publish(game: Game): { success: boolean } {
    this.client.emit('create_game', game);
    return {
      success: true,
    };
  }
}
