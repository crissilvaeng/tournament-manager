import { Injectable } from '@nestjs/common';
import { CreateTournament } from './dto/create-tournament.dto';
import { UpdateTournament } from './dto/update-tournament.dto';

@Injectable()
export class TournamentsService {
  create(createTournament: CreateTournament) {
    return 'This action adds a new tournament';
  }

  findAll() {
    return `This action returns all tournaments`;
  }

  findOne(id: string) {
    return `This action returns a #${id} tournament`;
  }

  update(id: string, updateTournament: UpdateTournament) {
    return `This action updates a #${id} tournament`;
  }

  remove(id: string) {
    return `This action removes a #${id} tournament`;
  }
}
