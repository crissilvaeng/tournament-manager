import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';

export class CreateTournament {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @MinDate(new Date())
  date: Date;
}
