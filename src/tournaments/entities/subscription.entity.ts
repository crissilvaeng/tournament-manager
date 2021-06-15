import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Table
export class Subscription extends Model {
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
  @Column({
    type: DataType.UUID,
  })
  tournamentId: string;

  @BelongsTo(() => Tournament)
  tournament: Tournament;
}
