import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Game {
  @IsString()
  @IsNotEmpty()
  white: string;

  @IsString()
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
