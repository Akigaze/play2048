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

export interface Component {
  element: HTMLElement;
  render(): void;
}

export interface Setting {
  getNrow(): number;
  getNcol(): number;
}

export interface Grid {}

export interface Score {}
