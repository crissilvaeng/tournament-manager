import { Module } from '@nestjs/common';
import { SubscriptionController } from './controllers/subscription.controller';
import { SubscriptionService } from './Services/subscription.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
// import { ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [
    {
      provide: 'ISubscriptionService',
      useClass: SubscriptionService,
    },
  ],
})
export class SubscriptionModule {}
