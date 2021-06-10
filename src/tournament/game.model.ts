import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Subscription extends Model<Subscription> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  playerWhite: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  playerBlack: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  gameResult: string;
}
