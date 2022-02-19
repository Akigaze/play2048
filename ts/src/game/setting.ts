import { Component, Grid, Options, Score, Setting as SettingI } from "./types";

export default class Setting implements Component, SettingI {
  element: HTMLElement;
  grid: Grid;
  score: Score;

  options: Options;
  constructor(element: HTMLElement, options: Options) {
    this.element = element;
    this.options = options;
  }

  getRow(): number {
    return this.options.row;
  }

  getCol(): number {
    return this.options.col;
  }

  setup(grid: Grid, score: Score): void {
    this.grid = grid;
    this.score = score;
  }

  render(): void {
    this.element.innerText = "setting";
  }
}
