import {
  Component,
  Grid,
  Options,
  Score,
  Setting as SettingI,
  Store,
} from "./types";

export default class Setting implements Component<any>, SettingI {
  options: Options;
  constructor(options: Options) {
    this.options = options;
  }
  
  connect(store: Store): void {}

  render(): HTMLElement {
    const el: HTMLSpanElement = document.createElement("span");
    el.id = "g2048-setting";

    el.innerText = "setting";
    return el;
  }
}
