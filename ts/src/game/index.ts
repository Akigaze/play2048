import Grid from "./grid";
import Score from "./score";
import Setting from "./setting";
import { Game, Options, Selector } from "./types";

export default class Game2048 implements Game {
  private _grid: Grid;
  private _setting: Setting;
  private _score: Score;

  constructor() {}

  setting(selector: Selector, options?: Options): Game {
    this._setting = new Setting(
      this._findElement(selector),
      this.mergeOptions(options)
    );
    return this;
  }

  score(selector: Selector): Game {
    this._score = new Score(this._findElement(selector));
    return this;
  }

  grid(selector: Selector): Game {
    this._grid = new Grid(this._findElement(selector));
    return this;
  }

  getDefaultOptions(): Options {
    return { nrow: 4, ncol: 4 };
  }

  mergeOptions(options: Options): Options {
    let defaultOpts = this.getDefaultOptions();
    if (options) {
      return { ...defaultOpts, ...options };
    }
    return defaultOpts;
  }

  private _findElement(selector: Selector): HTMLElement {
    const element: HTMLElement = document.querySelector(selector);
    if (element === null) {
      throw new Error("selector not exist: " + selector);
    }
    return element;
  }

  start(): void {
    this._grid.setup(this._setting, this._score);
    this._setting.setup(this._grid, this._score);

    this._setting.render();
    this._score.render();
    this._grid.render();
  }
}
