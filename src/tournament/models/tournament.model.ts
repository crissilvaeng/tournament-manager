import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Subscription } from './subscription.model';

@Table
export class Tournament extends Model<Tournament> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startsAt: Date;

  @HasMany(() => Subscription)
  subscriptions: Subscription[];
}
