import Grid from "./grid";
import Score from "./score";
import Setting from "./setting";
import { Game, Options, Selector } from "./types";

export default class Game2048 implements Game {
  private _setting: Setting;
  private _grid: Grid;
  private _score: Score;

  settingContaienr: HTMLElement
  gridContaienr: HTMLElement
  scoreContaienr: HTMLElement

  constructor() {}

  setting(selector: Selector, options?: Options): Game {
      
    this.settingContaienr = this._findElement(selector)
    this._setting = new Setting(this.mergeOptions(options));
    return this;
  }


  
  grid(selector: Selector): Game {
    this.gridContaienr = this._findElement(selector)
    this._grid = new Grid();
    return this;
  }

  score(selector: Selector): Game {
    this.scoreContaienr = this._findElement(selector)
    this._score = new Score();
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

    this.settingContaienr.appendChild(this._setting.render());
    this.gridContaienr.appendChild(this._grid.render());
    this.scoreContaienr.appendChild(this._score.render());
  }
}
