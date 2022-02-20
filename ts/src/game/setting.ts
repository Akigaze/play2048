import { Component, Grid, Options, Score, Setting as SettingI } from "./types";

export default class Setting implements Component<any>, SettingI {
  grid: Grid;
  score: Score;

  options: Options;
  constructor(options: Options) {
    this.options = options;
  }

  getNrow(): number {
    return this.options.nrow;
  }

  getNcol(): number {
    return this.options.ncol;
  }

  setup(grid: Grid, score: Score): void {
    this.grid = grid;
    this.score = score;
  }

  render(): HTMLElement {
    const el: HTMLSpanElement = document.createElement("span");
    el.id = "g2048-setting"

    el.innerText = "setting";
    return el;
  }
}
