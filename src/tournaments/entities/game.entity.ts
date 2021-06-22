import { IsNotEmpty, IsUUID } from 'class-validator';

export class Game {
  @IsUUID()
  @IsNotEmpty()
  white: string;

  @IsUUID()
  @IsNotEmpty()
  black: string;

  @IsUUID()
  @IsNotEmpty()
  tournamentId: string;

  constructor(white: string, black: string, tornamentId: string) {
    this.white = white;
    this.black = black;
    this.tournamentId = tornamentId;
  }
}
