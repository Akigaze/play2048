import { Component, Score as ScoreI } from "./types";

export default class Score implements Component<any>, ScoreI {

  constructor() {
  }

  render(): HTMLElement {
    const el: HTMLSpanElement = document.createElement("span");
    el.id = "g2048-score"
    
    el.innerText = "score";
    return el;
  }
}
