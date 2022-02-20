import * as stl from "./style";
import { Component, Score as ScoreI, ScoreProps, State, Store } from "./types";

export default class Score implements Component<{ score: number }>, ScoreI {
  readonly scoreId: string;
  readonly highScoreId: string;

  private score: number = 0;
  private highScore: number = 0;

  constructor({ score, highScore }: ScoreProps) {
    this.score = score;
    this.highScore = highScore;

    this.scoreId = "g2048-score";
    this.scoreId = "g2048-high-score";
  }

  getScore(): number {
    return this.score;
  }

  createTitleElement(): HTMLElement {
    const el: HTMLDivElement = document.createElement("div");
    el.style.display = "flex";
    el.style.alignItems = "center";
    const text: HTMLSpanElement = document.createElement("span");

    text.innerText = "2048";
    text.style.display = "inline-block";
    text.style.fontSize = "100px";
    text.style.fontWeight = "bolder";
    text.style.color = stl.DARK_BROWN;

    el.appendChild(text);
    return el;
  }

  createScoreElement(id: string, text: string, value: number): HTMLElement {
    const el: HTMLDivElement = document.createElement("div");

    el.style.display = "flex";
    el.style.flexFlow = "column";
    el.style.alignItems = "center";
    el.style.borderRadius = "8px";
    el.style.padding = "10px 12px 4px 12px";
    el.style.margin = "0px 10px";
    el.style.background = stl.BROWN;
    el.style.minWidth = "60px";

    const textEl: HTMLSpanElement = document.createElement("span");

    textEl.innerText = text;
    textEl.style.display = "inline-block";
    textEl.style.fontSize = "12px";
    textEl.style.fontWeight = "bolder";
    textEl.style.color = stl.SMALL_COLOR;

    const valueEl: HTMLSpanElement = document.createElement("span");
    valueEl.id = id;

    valueEl.innerText = value + "";
    valueEl.style.display = "inline-block";
    valueEl.style.fontSize = "24px";
    valueEl.style.fontWeight = "bolder";
    valueEl.style.marginTop = "6px";
    valueEl.style.color = stl.RICE_WHITE;

    el.appendChild(textEl);
    el.appendChild(valueEl);
    return el;
  }

  render(): HTMLElement {
    const el: HTMLDivElement = document.createElement("div");
    el.style.minWidth = "400px";
    el.style.margin = "20px 0px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-between";

    const titleEl: HTMLElement = this.createTitleElement();
    const scoreEl: HTMLElement = this.createScoreElement(
      this.scoreId,
      "SCORE",
      this.score
    );
    const highScoreEl: HTMLElement = this.createScoreElement(
      this.highScoreId,
      "HIGH SCORE",
      this.highScore
    );

    el.appendChild(titleEl);
    el.appendChild(scoreEl);
    el.appendChild(highScoreEl);

    return el;
  }

  rerender(props: ScoreProps): void {
    if (this.score != props.score) {
      this.score = props.score;
      let scoreEl: HTMLSpanElement = document.querySelector(`#${this.scoreId}`);
      scoreEl.innerText = props.score + "";
    }
    if (this.highScore < props.highScore) {
      this.highScore = props.highScore;
      let hightScoreEl: HTMLSpanElement = document.querySelector(
        `#${this.highScoreId}`
      );
      hightScoreEl.innerText = this.highScore + "";
    }
  }

  connect({ subscribe }: Store): void {
    subscribe((state: State) => {
      this.rerender({ ...state.scores });
    });
  }
}
