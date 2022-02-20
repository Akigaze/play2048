import Grid from "./grid";
import Score from "./score";
import Setting from "./setting";
import Store from "./store";
import { cell, Game, options, Options, Selector, State } from "./types";
import { findElement, generateRandomCells } from "./utils";

export class Game2048 implements Game {
  private setting: Setting;
  private grid: Grid;
  private score: Score;
  private store: Store;

  constructor(store: Store, setting: Setting, grid: Grid, score: Score) {
    this.store = store;
    this.score = score;
    this.setting = setting;
    this.grid = grid;
  }

  startSetting(selector: Selector): Setting {
    this.setting.connect(this.store);
    findElement(selector).appendChild(this.setting.render());
    return this.setting;
  }

  startGrid(selector: Selector): Grid {
    this.grid.connect(this.store);
    findElement(selector).appendChild(this.grid.render());
    return this.grid;
  }

  startScore(selector: Selector): Score {
    this.score.connect(this.store);
    findElement(selector).appendChild(this.score.render());
    return this.score;
  }
}

export default class Game2048Builder {
  constructor() {}

  static getDefaultOptions(): Options {
    return { nrow: 4, ncol: 4 };
  }

  mergeOptions(options?: options): Options {
    let defaultOpts = Game2048Builder.getDefaultOptions();
    if (options) {
      return { ...defaultOpts, ...options };
    }
    return defaultOpts;
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

  initStore(opts: Options) {
    const initCells = this.initCells(opts.nrow, opts.ncol);
    let initState: State = {
      options: opts,
      scores: { score: 0, highScore: 0 },
      cells: initCells,
      history: { cells: [], scores: [] },
      stepCount: 0,
    };
    console.log("init state: ", initState);

    let store: Store = new Store(initState);
    return store;
  }

  build(options?: options): Game {
    const opts = this.mergeOptions(options);
    let store: Store = this.initStore(opts);
    let state: State = store.state;

    let setting: Setting = new Setting({ ...state.options });
    let grid: Grid = new Grid({ ...state.options, cells: [...state.cells] });
    let score: Score = new Score({ ...state.scores });

    return new Game2048(store, setting, grid, score);
  }
}
