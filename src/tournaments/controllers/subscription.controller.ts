import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Subscription } from '../../tournaments/entities/subscription.entity';
import { SubscriptionService } from '../services/subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Get()
  async getAll(): Promise<Subscription[]> {
    return this.subscriptionService.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Subscription> {
    return this.subscriptionService.getById(params.id);
  }

  @Post()
  async create(@Body() subscription: Subscription) {
    return this.subscriptionService.create(subscription);
  }

  @Put()
  async edit(
    @Body() subscription: Subscription,
  ): Promise<[number, Subscription[]]> {
    return this.subscriptionService.edit(subscription);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.subscriptionService.delete(params.id);
  }
}
