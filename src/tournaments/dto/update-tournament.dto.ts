import { PickType } from '@nestjs/swagger';
import { TournamentDto } from './tournament.dto';

export class UpdateTournamentDto extends PickType(TournamentDto, [
  'description',
] as const) {}
