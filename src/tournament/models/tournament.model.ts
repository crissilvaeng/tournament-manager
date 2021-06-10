import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
}