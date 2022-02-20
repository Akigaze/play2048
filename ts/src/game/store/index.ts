import { score } from "../grid/algorithm";
import { Action, cell, scores, State, Store as StoreI } from "../types";
import { generateRandomCells } from "../utils";
import { RENEW, UPDATE_CELLS, UPDATE_SCORE } from "./action";

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
        return { ...this.state, cells: action.payload };
      }
      case UPDATE_SCORE: {
        const high: number = this.state.scores.highScore;
        let plus: number = action.payload;
        let score: number = this.state.scores.score + plus;
        let highScore: number = score > high ? score : high;
        return { ...this.state, scores: { score, highScore } };
      }
      case RENEW: {
        let newCells: cell[] = this.state.cells.map(
          (c) => ({ index: c.index, value: 0 } as cell)
        );
        generateRandomCells(newCells.length, 2).forEach((c) => {
          newCells[c.index].value = c.value;
        });
        let newScores: scores = { ...this.state.scores, score: 0 };
        return { ...this.state, scores: newScores, cells: newCells };
      }
    }
    return this.state;
  };
}
