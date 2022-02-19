export const BROWN: string = "#bbada0";
export const RICE_WHITE: string = "#d6cdc6";
export const CELL_SIZE: number = 80;
export const CELL_FONT_SIZE: number = 40;
export const CELL_MARGIN: number = 8;

export type CellStyle = {
  background: string;
  color: string;
};

export interface CellStyles {
  [prop: number]: CellStyle;
}

export const CELL_STYLES: CellStyles = {
  0: { background: RICE_WHITE, color: RICE_WHITE },
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
