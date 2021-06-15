import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from '../../tournaments/entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private subscriptionModel: typeof Subscription,
  ) {}

  async getAll(): Promise<Subscription[]> {
    return this.subscriptionModel.findAll();
  }

  async getById(id: number): Promise<Subscription> {
    return this.subscriptionModel.findByPk(id);
  }

  async create(subscription: Subscription) {
    this.subscriptionModel.create(subscription);
  }

  async edit(subscription: Subscription): Promise<[number, Subscription[]]> {
    return this.subscriptionModel.update(subscription, {
      where: {
        id: subscription.id,
      },
    });
  }

  async delete(id: number) {
    const subscription: Subscription = await this.getById(id);
    subscription.destroy();
  }
}
