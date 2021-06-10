import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Subscription extends Model<Subscription> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  agentId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tournamentId: string;
}
