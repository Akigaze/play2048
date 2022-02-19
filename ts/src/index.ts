import Game2048 from "./game";

console.log("hello 2048");

window.onload = () => {
  new Game2048()
    .setting(".g2048-setting", {nrow: 5, ncol: 6})
    .score(".g2048-score")
    .grid(".g2048-grid")
    .start();
};
