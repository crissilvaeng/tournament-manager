import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Tournament } from './tournament.model';

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

  @ForeignKey(() => Tournament)
  @Column
  tournamentId: number;

  @BelongsTo(() => Tournament)
  tournament: Tournament;
}
