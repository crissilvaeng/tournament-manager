import { Subscription } from '../models/subscription.model';

export interface ISubscriptionService {
  getAll(): Promise<Subscription[]>;

  getById(id: number): Promise<Subscription>;

  create(subscription: Subscription);

  edit(subscription: Subscription): Promise<[number, Subscription[]]>;

  delete(id: number);
}
