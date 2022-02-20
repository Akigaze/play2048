import { Component, Cell as CellI, cell } from "../types";
import * as stl from "../style";

export type CellProps = {
  index: number;
  row: number;
  col: number;
};

export default class Cell implements Component<number>, CellI {
  private row: number;
  private col: number;

  readonly index: number;
  readonly id: string;
  value: number = 0;
  constructor({ index, row, col }: CellProps) {
    this.index = index;
    this.row = row;
    this.col = col;

    this.id = Cell.getId(index);
  }

  static getId(index: number): string {
    return `g2048-cell-${index}`;
  }

  simplify(): cell {
    return { index: this.index, value: this.value };
  }

  getRow(): number {
    return this.row;
  }

  getCol(): number {
    return this.col;
  }

  randomCell(): cell {
    const random = Math.random();
    return { value: random > 0.5 ? 4 : 2, index: this.index };
  }

  render(): HTMLElement {
    const cellStyle: stl.CellStyle = stl.CELL_STYLES[this.value];

    let cell: HTMLDivElement = document.createElement("div");
    cell.id = this.id;

    cell.style.borderRadius = "8px";
    cell.style.display = "flex";
    cell.style.justifyContent = "center";
    cell.style.alignItems = "center";

    cell.style.margin = `${stl.CELL_MARGIN}px`;
    cell.style.height = `${stl.CELL_SIZE}px`;
    cell.style.width = `${stl.CELL_SIZE}px`;
    cell.style.background = cellStyle.background;

    let value: HTMLSpanElement = document.createElement("span");
    value.style.userSelect = "none";
    value.style.fontWeight = "bolder";

    value.style.fontSize = `${stl.CELL_FONT_SIZE}px`;
    value.style.color = cellStyle.color;
    value.innerText = `${this.value || ""}`;

    cell.appendChild(value);
    return cell;
  }

  rerender(newValue: number): void {
    if (newValue !== this.value) {
      this.value = newValue;
      const cellStyle: stl.CellStyle = stl.CELL_STYLES[this.value];
      const cell: HTMLDivElement = document.querySelector(`#${this.id}`);
      cell.style.background = cellStyle.background;
      const value: HTMLSpanElement = cell.querySelector("span");
      value.style.color = cellStyle.color;
      value.innerText = `${this.value || ""}`;
      return;
    }
  }
}
