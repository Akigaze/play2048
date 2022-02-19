export interface Game {
  setting(selector: Selector, options?: Options): Game;
  score(selector: Selector): Game;
  grid(selector: Selector): Game;
  start(): void;
}

export type Selector = string;

export type Options = {
  row?: number;
  col?: number;
};

export interface Component {
  element: HTMLElement;
  render(): void;
}

export interface Setting {
  getRow(): number;
  getCol(): number;
}

export interface Grid {}

export interface Score {}
