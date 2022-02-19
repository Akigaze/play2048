export interface Game {
  setting(selector: Selector, options?: Options): Game;
  score(selector: Selector): Game;
  grid(selector: Selector): Game;
  start(): void;
}

export type Selector = string;

export type Options = {
  nrow?: number;
  ncol?: number;
};

export interface Component<T> {
  element?: HTMLElement | null;
  render(): HTMLElement | void;
  rerender?(preValue: T): void;
}

export interface Setting {
  getNrow(): number;
  getNcol(): number;
}

export interface Grid {}

export interface cell {
  readonly index: number;
  value: number;
}

export interface Cell {
  readonly id: string;
  value: number;
  getRow(): number;
  getCol(): number;
}

export interface Score {}

export enum Direction {
  up = "ArrowUp",
  down = "ArrowDown",
  left = "ArrowLeft",
  right = "ArrowRight",
}
