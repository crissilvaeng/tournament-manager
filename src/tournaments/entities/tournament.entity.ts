import { Table, Model, Column, DataType } from 'sequelize-typescript';

export enum TournamentStatus {
  Open = 'Open',
  Close = 'Close',
  Running = 'Running',
}

@Table
export class Tournament extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime: Date;

  @Column({
    type: DataType.ENUM(...Object.keys(TournamentStatus)),
    defaultValue: TournamentStatus.Open,
  })
  status: string;
}
