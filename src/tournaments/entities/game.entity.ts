export class Game {
  white: string;
  black: string;
  tornamentId: string;

  constructor(white: string, black: string, tornamentId: string) {
    this.white = white;
    this.black = black;
    this.tornamentId = tornamentId;
  }
}
