import {
  Component,
  Score,
  Setting,
  Grid as GridI,
  Direction,
  cell,
} from "../types";
import Cell from "./cell";
import * as stl from "../style";
import { shift } from "./algorithm";

export default class Grid implements Component<cell[]>, GridI {
  setting: Setting;
  score: Score;

  private cells: Cell[];
  readonly id: string;
  constructor() {
    this.id = `g2048-grid`;
  }

  static generateRandomValue(cells: Cell[], times: number = 2): cell[] {
    let generated: cell[] = [];
    for (let i = 0; i < times; i++) {
      let random = Math.random();
      let i = Math.floor(random * cells.length);
      generated.push(cells[i].randomCell());
    }
    return generated;
  }
  private findElement(): HTMLElement {
    return document.querySelector(`#${this.id}`);
  }

  private createCells(): Cell[] {
    const cells: Cell[] = [];
    let i: number = 0;
    for (let nr = 0; nr < this.setting.getNrow(); nr++) {
      for (let nc = 0; nc < this.setting.getNcol(); nc++) {
        let cell: Cell = new Cell({ index: i++, row: nr, col: nc });
        cells.push(cell);
      }
    }
    return cells;
  }

  groupCells(
    groupKey: (c: Cell) => number,
    sortKey: (c: Cell) => number
  ): Cell[][] {
    return Object.values(
      this.cells.reduce<{ [g: number]: Cell[] }>((pre, cur) => {
        let g: number = groupKey(cur);
        (pre[g] || (pre[g] = [])).push(cur);
        return pre;
      }, {})
    ).map((cs) => cs.sort((x, y) => sortKey(x) - sortKey(y)));
  }

  private move(cellGroup: Cell[][]): void {
    let newValues: cell[] = [];
    for (const group of cellGroup) {
      let values: cell[] = group.map((c) => c.simplify());
      shift(values.map((c) => c.value)).forEach(
        (v, i) => (values[i].value = v)
      );
      newValues = [...newValues, ...values];
      console.log(values);
    }
    newValues = newValues.sort((x, y) => x.index - y.index);
    this.findElement().dispatchEvent(new RerenderEvent(newValues));
  }

  moveUp(): void {
    let cellGroup: Cell[][] = this.groupCells(
      (c: Cell) => c.getCol(),
      (c: Cell) => c.getRow()
    );
    this.move(cellGroup);
  }

  moveDown(): void {
    let cellGroup: Cell[][] = this.groupCells(
      (c: Cell) => c.getCol(),
      (c: Cell) => -1 * c.getRow()
    );
    this.move(cellGroup);
  }

  moveLeft(): void {
    let cellGroup: Cell[][] = this.groupCells(
      (c: Cell) => c.getRow(),
      (c: Cell) => c.getCol()
    );
    this.move(cellGroup);
  }

  moveRight(): void {
    let cellGroup: Cell[][] = this.groupCells(
      (c: Cell) => c.getRow(),
      (c: Cell) => -1 * c.getCol()
    );
    this.move(cellGroup);
  }

  addEventHandlers(el: HTMLElement): void {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case Direction.up:
          this.moveUp();
          break;
        case Direction.down:
          this.moveDown();
          break;
        case Direction.left:
          this.moveLeft();
          break;
        case Direction.right:
          this.moveRight();
          break;
      }
    });

    el.addEventListener("rerender", (e: Event) => {
      const newCells: cell[] = (e as RerenderEvent).cells;
      this.rerender(newCells);
    });
  }

  setup(setting: Setting, score: Score): void {
    this.setting = setting;
    this.score = score;
    this.cells = this.createCells();
  }

  render(): HTMLElement {
    const el: HTMLDivElement = document.createElement("div");
    el.id = "g2048-grid";

    el.style.borderRadius = "16px";
    el.style.display = "flex";
    el.style.flexFlow = "row wrap";
    el.style.fontFamily = "sans-serif";

    el.style.padding = `${stl.CELL_MARGIN}px`;
    el.style.background = stl.BROWN;
    el.style.width = `${
      (stl.CELL_SIZE + 2 * stl.CELL_MARGIN) * this.setting.getNcol()
    }px`;

    Grid.generateRandomValue(this.cells, 2).forEach(
      (c) => (this.cells[c.index].value = c.value)
    );

    for (const cell of this.cells) {
      el.appendChild(cell.render());
    }

    this.addEventHandlers(el);
    return el;
  }

  rerender(newValue: cell[]): void {
    new Promise<void>((resolve, reject) => {
      const changed: boolean = newValue.some(
        (c: cell, i: number) => c.value !== this.cells[i].value
      );
      console.log("---- change: ", changed);

      this.cells.forEach((cell: Cell, i: number) => {
        cell.rerender(newValue[i].value);
      });

      if (changed) {
        resolve();
      }
    })
      .then((): void => {
        const zeroCells: Cell[] = this.cells.filter((c) => c.value === 0);
        Grid.generateRandomValue(zeroCells, 1).forEach((c) =>
          this.cells[c.index].rerender(c.value)
        );
      })
      .catch();
  }
}

class RerenderEvent extends Event {
  cells: cell[];

  constructor(cells: cell[]) {
    super("rerender");
    this.cells = cells;
  }
}
