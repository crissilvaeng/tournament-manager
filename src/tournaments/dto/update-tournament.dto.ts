import { PartialType } from '@nestjs/swagger';
import { CreateTournament } from './create-tournament.dto';

export class UpdateTournament extends PartialType(CreateTournament) {}
