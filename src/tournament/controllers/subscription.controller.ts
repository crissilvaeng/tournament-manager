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
import { Subscription } from '../models/subscription.model';
import { ISubscriptionService } from '../interfaces/subscription.service.interface';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    @Inject('ISubscriptionService')
    private serviceInterface: ISubscriptionService,
  ) {}

  @Get()
  async getAll(): Promise<Subscription[]> {
    return this.serviceInterface.getAll();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Subscription> {
    return this.serviceInterface.getById(params.id);
  }

  @Post()
  async create(@Body() subscription: Subscription) {
    return this.serviceInterface.create(subscription);
  }

  @Put()
  async edit(
    @Body() subscription: Subscription,
  ): Promise<[number, Subscription[]]> {
    return this.serviceInterface.edit(subscription);
  }

  @Delete(':id')
  async delete(@Param() params) {
    this.serviceInterface.delete(params.id);
  }
}
