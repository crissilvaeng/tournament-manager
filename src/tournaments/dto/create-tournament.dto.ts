import { OmitType } from '@nestjs/swagger';
import { TournamentDto } from './tournament.dto';

export class CreateTournamentDto extends OmitType(TournamentDto, [
  'slug',
  'status',
] as const) {}
