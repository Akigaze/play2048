export const BROWN: string = "#bbada0";
export const LIGHT_BROWN: string = "#d6cdc6";
export const RICE_WHITE: string = "#fcf7e9";
export const DARK_BROWN: string = "#766f67";
export const CELL_SIZE: number = 80;
export const CELL_FONT_SIZE: number = 40;
export const CELL_MARGIN: number = 8;
export const SMALL_COLOR: string = "#ddd1c5";
export const BTN_SIZE: number = 60;

export type CellStyle = {
  background: string;
  color: string;
};

export interface CellStyles {
  [prop: number]: CellStyle;
}

export const CELL_STYLES: CellStyles = {
  0: { background: LIGHT_BROWN, color: LIGHT_BROWN },
  2: { background: "#ede5da", color: "#837a70" },
  4: { background: "#ece0c8", color: "#796b60" },
  8: { background: "#f0b17b", color: "#f7f0e4" },
  16: { background: "#f59563", color: "#fdf4ec" },
  32: { background: "", color: "" },
  64: { background: "#f45e3b", color: "#faf6f3" },
  128: { background: "#edce73", color: "#f8f7ef" },
  256: { background: "", color: "" },
  512: { background: "", color: "" },
  1024: { background: "", color: "" },
  2048: { background: "", color: "" },
  4096: { background: "", color: "" },
  8192: { background: "#000", color: "" },
};
