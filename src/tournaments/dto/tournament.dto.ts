import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MinDate } from 'class-validator';

export class TournamentDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @MinDate(new Date())
  startTime: Date;

  @IsString()
  @IsNotEmpty()
  status: string;
}
