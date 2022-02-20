import { score } from "../grid/algorithm";
import Cell from "../grid/cell";
import { Action, cell, scores, State, Store as StoreI } from "../types";
import { generateRandomCells } from "../utils";
import { RENEW, REVERT, UPDATE_CELLS, UPDATE_SCORE } from "./action";

export default class Store implements StoreI {
  state: State;

  private subscribers: Array<(state: State) => any>;

  constructor(state: State) {
    this.state = state;
    this.subscribers = [];
  }

  dispatch = (action: Action): void => {
    new Promise<State>((resolve, reject) => {
      let newState: State = this.reduce(action);
      if (newState === this.state) {
        return;
      }
      resolve(newState);
    }).then((state: State) => {
      this.state = state;
      for (let subscriber of this.subscribers) {
        subscriber(this.state);
      }
    });
  };

  subscribe = (fn: (state: State) => void): void => {
    this.subscribers.push(fn);
  };

  reduce = (action: Action): State => {
    switch (action.type) {
      case UPDATE_CELLS: {
        const history = this.state.history;
        let cellHistory: cell[][] = [...history.cells, this.state.cells];
        let stepCount: number = this.state.stepCount++;
        return {
          ...this.state,
          cells: action.payload,
          history: { ...history, cells: cellHistory },
          stepCount,
        };
      }
      case UPDATE_SCORE: {
        const high: number = this.state.scores.highScore;
        let plus: number = action.payload;
        let score: number = this.state.scores.score + plus;
        let highScore: number = score > high ? score : high;

        const history = this.state.history;

        let scoreHistory: scores[] = [...history.scores, this.state.scores];
        return {
          ...this.state,
          scores: { score, highScore },
          history: { ...history, scores: scoreHistory },
        };
      }
      case RENEW: {
        let cells: cell[] = this.state.cells.map(
          (c) => ({ index: c.index, value: 0 } as cell)
        );
        generateRandomCells(cells.length, 2).forEach((c) => {
          cells[c.index].value = c.value;
        });
        let newScores: scores = { ...this.state.scores, score: 0 };
        return {
          ...this.state,
          scores: newScores,
          cells,
          history: { cells: [], scores: [] },
          stepCount: 0,
        };
      }

      case REVERT: {
        let history = this.state.history;
        if (history.cells.length === 0) {
          return this.state;
        }
        let cells: cell[] = history.cells.pop();
        let scores: scores = history.scores.pop();
        let stepCount: number = this.state.stepCount--;
        return {
          ...this.state,
          scores,
          cells,
          stepCount,
        };
      }
    }
    return this.state;
  };
}
