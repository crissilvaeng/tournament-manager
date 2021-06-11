import { Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum TournamentStatus {
  Open = 'OPEN',
  Close = 'CLOSE',
  Running = 'RUNNING',
}

@Exclude()
@Table({
  timestamps: true,
  paranoid: true,
  version: true,
  getterMethods: {
    timestamp() {
      return moment().unix();
    },
  },
})
export class Tournament extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  slug: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Expose()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime: Date;

  @Expose()
  @Column({
    type: DataType.ENUM(...Object.keys(TournamentStatus)),
    defaultValue: TournamentStatus.Open,
  })
  status: string;
}
