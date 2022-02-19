import { Component, Score as ScoreI } from "./types";

export default class Score implements Component, ScoreI {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  render(): void {
    this.element.innerText = "score";
  }
}
