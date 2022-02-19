import { Component, Score, Setting, Grid as GridI } from "./types";
import * as stl from "./style";

export default class Grid implements Component, GridI {
  element: HTMLElement;
  setting: Setting;
  score: Score;

  private cells: Cell[];
  constructor(element: HTMLElement) {
    this.element = element;
  }

  private createCells(): Cell[] {
    const cells: Cell[] = [];
    let i: number = 0;
    for (let nr = 0; nr < this.setting.getNrow(); nr++) {
      for (let nc = 0; nc < this.setting.getNcol(); nc++) {
        let cell: Cell = new Cell(i++, nr, nc);
        cells.push(cell);
      }
    }
    return cells;
  }

  private generateRandomCell(cells: Cell[]): void {
    const random = Math.random();
    let i = Math.floor(random * cells.length);
    cells[i].value = random > 0.5 ? 4 : 2;
  }

  private renderCells(cells: Cell[]): HTMLElement[] {
    return cells.map((c: Cell, i: number) => {
      let cell: HTMLDivElement = document.createElement("div");

      cell.style.borderRadius = "8px";
      cell.style.margin = `${stl.CELL_MARGIN}px`;

      cell.id = c.getId();

      const cellStyle: stl.CellStyle = stl.CELL_STYLES[c.value];


      cell.style.height = `${stl.CELL_SIZE}px`;
      cell.style.width = `${stl.CELL_SIZE}px`;
      cell.style.background = cellStyle.background;
      cell.style.display = "flex"
      cell.style.justifyContent = "center"
      cell.style.alignItems = "center"

      let value: HTMLSpanElement = document.createElement('span')
      value.style.fontSize = `${stl.CELL_FONT_SIZE}px`
      value.style.userSelect = "none"
      value.style.fontWeight = "bolder"
      value.style.color = cellStyle.color

      value.innerText = `${c.value || ""}`;

      cell.appendChild(value)
      return cell;
    });
  }

  setup(setting: Setting, score: Score): void {
    this.setting = setting;
    this.score = score;
    this.cells = this.createCells();
  }

  render(): void {
    const el = this.element;

    el.style.borderRadius = "16px";
    el.style.padding = `${stl.CELL_MARGIN}px`;
    el.style.display = "flex";
    el.style.flexFlow = "row wrap";
    el.style.fontFamily = "sans-serif"


    el.style.background = stl.BROWN;
    el.style.width = `${
      (stl.CELL_SIZE + 2 * stl.CELL_MARGIN) * this.setting.getNcol()
    }px`;

    this.generateRandomCell(this.cells)
    this.generateRandomCell(this.cells)    

    for (const cell of this.renderCells(this.cells)) {
      el.appendChild(cell);
    }
  }
}

class Cell {
  private index: number;
  private row: number;
  private col: number;
  value: number = 0;
  constructor(index: number, row: number, col: number) {
    this.index = index;
    this.row = row;
    this.col = col;
  }

  getId() {
    return `g2048-${this.index}`;
  }
}
