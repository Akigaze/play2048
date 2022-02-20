export interface Game {
  setting(selector: Selector): Game;
  score(selector: Selector): Game;
  grid(selector: Selector): Game;
  start(options?: Options): void;
}

export type Selector = string;

export type options = {
  nrow?: number;
  ncol?: number;
};

export type Options = {
  nrow: number;
  ncol: number;
};

export interface Component<T> {
  render(): HTMLElement;
  connect(store: Store): void;
}

export interface Setting {}

export type GridProps = {
  nrow: number;
  ncol: number;
  cells: cell[];
};

export interface Grid {}

export interface cell {
  readonly index: number;
  value: number;
}

export interface CellProps {
  readonly index: number;
  readonly row: number;
  readonly col: number;
  value?: number;
}

export interface Cell {
  readonly id: string;
  value: number;
  getRow(): number;
  getCol(): number;
}

export interface Score {
  getScore(): number;
}

export type ScoreProps = scores;

export enum Direction {
  up = "ArrowUp",
  down = "ArrowDown",
  left = "ArrowLeft",
  right = "ArrowRight",
}

export type scores = {
  score: number;
  highScore: number;
};

export type Action = {
  type: string;
  payload?: any;
};

export type State = {
  options: Options;
  cells: cell[];
  scores: scores;
  history: {cells: cell[][], scores: scores[]}
  stepCount: number
};

export interface Store {
  state: State;
  dispatch(action: Action): void;
  subscribe(fn: (state: State) => void): void;
}
