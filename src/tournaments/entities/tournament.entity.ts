import { Exclude, Expose } from 'class-transformer';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Subscription } from './subscription.entity';

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
  underscored: true,
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

  @HasMany(() => Subscription)
  subscriptions: Subscription[];

  @Column({
    type: DataType.VIRTUAL,
  })
  get timestamp() {
    return this.createdAt.getTime();
  }
}
