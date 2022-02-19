import { Component, Score, Setting, Grid as GridI } from "./types";

export default class Grid implements Component, GridI {
  element: HTMLElement;
  setting: Setting;
  score: Score;
  constructor(element: HTMLElement) {
    this.element = element;
  }

  setup(setting: Setting, score: Score): void {
    this.setting = setting;
    this.score = score;
  }

  render(): void {
    this.element.innerText = "grid"
  }
}
