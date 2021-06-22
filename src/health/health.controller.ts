import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { NatsOptions, RedisOptions, Transport } from '@nestjs/microservices';

import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly config: ConfigService,
    private readonly disk: DiskHealthIndicator,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly sequelize: SequelizeHealthIndicator,
  ) {}

  @ApiExcludeEndpoint()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () =>
        this.disk.checkStorage('disk', { thresholdPercent: 0.75, path: '/' }),
      async () => this.sequelize.pingCheck('sequelize'),
      async () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            url: this.config.get<string>('REDIS_URL'),
          },
        }),
        async () =>
      this.microservice.pingCheck<NatsOptions>('nats', {
        transport: Transport.NATS,
        options: {
          url: this.config.get<string>('NATS_URL'),
        },
      }),
    ]);
  }
}
