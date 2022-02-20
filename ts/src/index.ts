import Game2048Builder from "./game";
import { Game } from "./game/types";

window.onload = () => {
  const game: Game = new Game2048Builder().build({ nrow: 3, ncol: 2 });
  game.startSetting(".setting");
  game.startScore(".score");
  game.startGrid(".grid");
};
