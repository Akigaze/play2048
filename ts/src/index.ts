import Game2048 from "./game";

console.log("hello 2048");

window.onload = () => {
  new Game2048()
    .setting(".setting")
    .score(".score")
    .grid(".grid")
    .start({ nrow: 3, ncol: 2 });
};
