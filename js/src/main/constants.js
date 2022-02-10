const commonConstants = {
  EVENT_KEY: {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    38: "UP",
    40: "DOWN",
    37: "LEFT",
    39: "RIGHT"
  },
  ORDER: {
    FORWARD: 1,
    BACKWORD: -1
  },
  GAME_OVER: "GAME OVER!",
  WIN: "WIN!",
  LOSER: "ಥ_ಥ",
  ANIMATION: {
    OUT: "setting-out",
    IN: "setting-in"
  },
  CLASS: {
    SELECT_MODE: "select-mode",
    ROCKET_ACTIVE: "rocket-active"
  }
};

const gameConstants = {
  direction: {
    [commonConstants.EVENT_KEY.UP]: {
      isRow: false,
      order: commonConstants.ORDER.FORWARD
    },
    [commonConstants.EVENT_KEY.DOWN]: {
      isRow: false,
      order: commonConstants.ORDER.BACKWORD
    },
    [commonConstants.EVENT_KEY.LEFT]: {
      isRow: true,
      order: commonConstants.ORDER.FORWARD
    },
    [commonConstants.EVENT_KEY.RIGHT]: {
      isRow: true,
      order: commonConstants.ORDER.BACKWORD
    }
  },
  styleMapping: {
    0: { bgcolor: "", fontSize: 40 },
    2: { bgcolor: "#a5dfe3", fontSize: 64 },
    4: { bgcolor: "#88d9df", fontSize: 62 },
    8: { bgcolor: "#76dae1", fontSize: 60 },
    16: { bgcolor: "#5dcdd7", fontSize: 56 },
    32: { bgcolor: "#45cbd7", fontSize: 54 },
    64: { bgcolor: "#27c6d5", fontSize: 52 },
    128: { bgcolor: "#07c3d5", fontSize: 48 },
    256: { bgcolor: "#04aaba", fontSize: 46 },
    512: { bgcolor: "#1295a1", fontSize: 44 },
    1024: { bgcolor: "#097680", fontSize: 40 },
    2048: { bgcolor: "#035a61", fontSize: 40 }
  },
  mode: Object.freeze({
    33: { nrow: 3, ncol: 3 },
    44: { nrow: 4, ncol: 4 },
    55: { nrow: 5, ncol: 5 }
  }),
  maxHistory: 100,
  cellSize: 110
};
