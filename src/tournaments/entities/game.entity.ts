export class Game {
  white: string;
  black: string;
  tournamentId: string;

  constructor(white: string, black: string, tornamentId: string) {
    this.white = white;
    this.black = black;
    this.tournamentId = tornamentId;
  }
}
