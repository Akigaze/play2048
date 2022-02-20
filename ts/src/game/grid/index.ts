import {
  Component,
  Grid as GridI,
  Direction,
  cell,
  Store,
  GridProps,
  Action,
} from "../types";
import Cell from "./cell";
import * as stl from "../style";
import * as al from "./algorithm";
import { UPDATE_CELLS, UPDATE_SCORE } from "../store/action";
import { generateRandomCells, groupBy } from "../utils";

export default class Grid implements Component<cell[]>, GridI {
  private cells: Cell[];
  private nrow: number;
  private ncol: number;
  readonly id: string;

  dispatch: (action: Action) => void;

  constructor({ nrow, ncol, cells }: GridProps) {
    this.id = `g2048-grid`;
    this.nrow = nrow;
    this.ncol = ncol;
    this.cells = this.createCells(cells, nrow, ncol);
  }

  private createCells(cells: cell[], nrow: number, ncol: number): Cell[] {
    const cs: Cell[] = [];
    let i: number = 0;
    for (let nr = 0; nr < nrow; nr++) {
      for (let nc = 0; nc < ncol; nc++) {
        let c: Cell = new Cell({
          index: i,
          row: nr,
          col: nc,
          value: cells[i].value,
        });
        cs.push(c);
        i++;
      }
    }
    return cs;
  }

  groupCells(
    groupKey: (c: Cell) => number,
    sortKey: (c: Cell) => number
  ): Cell[][] {
    groupBy(this.cells, groupKey);
    return Object.values(groupBy(this.cells, groupKey)).map((cs) =>
      cs.sort((x, y) => sortKey(x) - sortKey(y))
    );
  }

  private move(cellGroup: Cell[][]): void {
    let newValues: cell[] = [];
    for (const group of cellGroup) {
      let values: cell[] = group.map((c) => c.simplify());
      al.shift(values.map((c) => c.value)).forEach(
        (v, i) => (values[i].value = v)
      );
      newValues = [...newValues, ...values];
      console.log(values);
    }
    newValues = newValues.sort((x, y) => x.index - y.index);

    this.checkAndDispatchChange(newValues);
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

  addEventHandlers(): void {
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
  }

  connect(store: Store): void {
    this.cells.forEach((c) => c.connect(store));
    this.dispatch = store.dispatch;
  }

  render(): HTMLElement {
    const el: HTMLDivElement = document.createElement("div");
    el.id = "g2048-grid";

    el.style.borderRadius = "16px";
    el.style.display = "flex";
    el.style.flexFlow = "row wrap";

    el.style.padding = `${stl.CELL_MARGIN}px`;
    el.style.background = stl.BROWN;
    const width = (stl.CELL_SIZE + 2 * stl.CELL_MARGIN) * this.ncol;

    el.style.width = `${width}px`;

    for (const cell of this.cells) {
      el.appendChild(cell.render());
    }

    this.addEventHandlers();
    return el;
  }

  checkAndDispatchChange(cells: cell[]): void {
    new Promise<number>((resolve, reject) => {
      let changed: boolean = cells.some(
        (c, i) => c.value !== this.cells[i].value
      );
      console.log("changed: ", changed);

      if (!changed) {
        return;
      }

      let scorePlus: number = al.score(
        this.cells.map((c) => c.value),
        cells.map((c) => c.value)
      );
      console.log("plus score: ", scorePlus);

      const zeroCells: cell[] = cells.filter((c) => c.value === 0);
      if (zeroCells.length > 0) {
        generateRandomCells(zeroCells.length, 1).forEach(
          (c) => (zeroCells[c.index].value = c.value)
        );
      }
      this.dispatch({ type: UPDATE_CELLS, payload: cells });
      resolve(scorePlus);
    })
      .then((scorePlus: number): void => {
        if (scorePlus > 0) {
          this.dispatch({ type: UPDATE_SCORE, payload: scorePlus });
        }
      })
      .catch();
  }
}
