import {
  Action,
  Component,
  Grid,
  Options,
  Score,
  Setting as SettingI,
  Store,
} from "../types";
import * as stl from "../style";
import { RENEW, REVERT } from "../store/action";

export default class Setting implements Component<any>, SettingI {
  options: Options;
  dispatch: (action: Action) => void;

  constructor(options: Options) {
    this.options = options;
    this;
  }

  connect(store: Store): void {
    this.dispatch = store.dispatch
  }

  buttonTemplate(text: string, description?: string): HTMLDivElement {
    let el: HTMLDivElement = document.createElement("div");

    el.title = description || text;
    el.style.display = "flex";
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    el.style.margin = "0px 20px";
    el.style.cursor = "pointer";

    el.style.width = `${stl.BTN_SIZE}px`;
    el.style.height = `${stl.BTN_SIZE}px`;

    el.style.borderRadius = "8px";
    el.style.background = stl.DARK_BROWN;

    let textEl: HTMLSpanElement = document.createElement("span");
    textEl.style.display = "inline-block";
    textEl.style.fontSize = `${stl.BTN_SIZE/2}px`;
    textEl.style.fontWeight = "bolder";
    textEl.style.userSelect = "none";
    textEl.style.color = stl.RICE_WHITE;
    textEl.innerText = text;

    el.appendChild(textEl);
    return el;
  }

  createRenewButton(): HTMLElement {
    let el: HTMLDivElement = this.buttonTemplate("😆", "new game");
    el.addEventListener("click", () => {
      this.dispatch({type: RENEW,})
    })
    return el;
  }

  createRevertButton(): HTMLElement {
    let el: HTMLDivElement = this.buttonTemplate("🙁", "revert");
    el.addEventListener("click", () => {
      this.dispatch({type: REVERT,})
    })
    return el;
  }

  render(): HTMLElement {
    const el: HTMLDivElement = document.createElement("div");

    el.id = "g2048-setting";
    el.style.display = "flex";
    el.style.flexFlow = "row";
    el.style.justifyContent = "end";
    el.style.padding = "10px 0px";
    el.style.margin = "10px 0px";

    let renewBtn: HTMLElement = this.createRenewButton();
    let revertBtn: HTMLElement = this.createRevertButton();

    el.appendChild(revertBtn);
    el.appendChild(renewBtn);
    return el;
  }
}
