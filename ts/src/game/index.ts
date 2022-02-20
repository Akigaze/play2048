import Grid from "./grid";
import Score from "./score";
import Setting from "./setting";
import Store from "./store";
import { cell, Game, options, Options, Selector, State } from "./types";
import { generateRandomCells } from "./utils";

export default class Game2048 implements Game {
  private _setting: Setting;
  private _grid: Grid;
  private _score: Score;

  settingContaienr: HTMLElement;
  gridContaienr: HTMLElement;
  scoreContaienr: HTMLElement;

  constructor() {}

  setting(selector: Selector): Game {
    this.settingContaienr = this._findElement(selector);
    return this;
  }

  grid(selector: Selector): Game {
    this.gridContaienr = this._findElement(selector);
    return this;
  }

  score(selector: Selector): Game {
    this.scoreContaienr = this._findElement(selector);
    return this;
  }

  getDefaultOptions(): Options {
    return { nrow: 4, ncol: 4 };
  }

  mergeOptions(options?: options): Options {
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

  initCells(nrow: number, ncol: number): cell[] {
    const cells: cell[] = [];
    let total: number = nrow * ncol;
    for (let i: number = 0; i < total; i++) {
      let c: cell = { index: i, value: 0 };
      cells.push(c);
    }

    let randomCells: cell[] = generateRandomCells(cells.length, 2);
    randomCells.forEach((c) => (cells[c.index].value = c.value));
    return cells;
  }

  start(options?: options): void {
    const opts = this.mergeOptions(options);
    let store: Store = this.initStore(opts);
    let state: State = store.state;

    this._setting = new Setting(state.options);
    this._grid = new Grid({ ...state.options, cells: state.cells });
    this._score = new Score(state.scores);

    this._grid.connect(store);
    this._setting.connect(store);
    this._score.connect(store);

    this.settingContaienr.appendChild(this._setting.render());
    this.gridContaienr.appendChild(this._grid.render());
    this.scoreContaienr.appendChild(this._score.render());
  }

  initStore(opts: Options) {
    let initState: State = {
      options: opts,
      scores: { score: 0, highScore: 0 },
      cells: this.initCells(opts.nrow, opts.ncol),
    };
    console.log("init state: ", initState);

    let store: Store = new Store(initState);
    return store;
  }
}
