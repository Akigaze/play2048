const commonConstants = {
  eventKey: {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    38: "UP",
    40: "DOWN",
    37: "LEFT",
    39: "RIGHT"
  },
  order: {
    FORWARD: 1,
    BACKWORD: -1
  },
  GAME_OVER: "GAME OVER!",
  WIN: "WIN!"
};

const gameConstants = {
  rowDirection: {
    [commonConstants.eventKey.UP]: false,
    [commonConstants.eventKey.DOWN]: false,
    [commonConstants.eventKey.LEFT]: true,
    [commonConstants.eventKey.RIGHT]: true
  },
  directionOrder: {
    [commonConstants.eventKey.UP]: commonConstants.order.FORWARD,
    [commonConstants.eventKey.DOWN]: commonConstants.order.BACKWORD,
    [commonConstants.eventKey.LEFT]: commonConstants.order.FORWARD,
    [commonConstants.eventKey.RIGHT]: commonConstants.order.BACKWORD
  },
  nrow: 3,
  ncol: 3,
  winPoint: 32,
  maxHistory: 100,
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
  }
};

const utils = {
  partition: (array, parts = 1) => {
    const sizeOfPart = Math.floor(array.length / parts);
    let result = [];
    for (let i = 0; i < parts; i++) {
      let row = array.slice(i * sizeOfPart, (i + 1) * sizeOfPart);
      result.push(row);
    }
    return result;
  },
  combine: (array, byRow = true) => {
    if (!byRow) {
      const parts = Math.max(...array.map(item => item.length));
      const arrayCopy = [...array];
      array = [];
      for (let i = 0; i < parts; i++) {
        array.push(
          arrayCopy.filter(item => item.length >= i + 1).map(item => item[i])
        );
      }
    }
    return array.reduce((pre, cur) => pre.concat(cur), []);
  },
  arrayFill: (array, value) => {
    return array.fill(null).map(i => JSON.parse(JSON.stringify(value)));
  },
  example: sample => {
    if (Array.isArray(sample) && sample.length > 0) {
      return sample[Math.floor(Math.random() * sample.length)];
    }
    return NaN;
  }
};

const state = {
  over: false,
  win: false,
  lastAction: null,
  lastResult: null,
  history: [],
  step: 0,
  cellValues: [0, 2, 16, 32, 64, 128, 256, 1024, 2048]
};

const dataUtils = {
  addNewValue: (values = state.cellValues) => {
    const newValues = [...values];
    const index = utils.example(
      newValues.map((v, i) => (v ? -1 : i)).filter(v => v > -1)
    );
    if (Number.isNaN(index)) {
      return newValues;
    }
    console.log(
      "add new value for: ",
      newValues.filter(v => v === 0).map((v, i) => i),
      " at: ",
      index
    );
    newValues[index] = 2;
    return newValues;
  },
  getCellValues: (byRow = true) => {
    if (byRow) {
      return utils.partition(state.cellValues, gameConstants.nrow);
    }
    let values = utils.arrayFill(Array(gameConstants.ncol), []);
    state.cellValues.forEach((value, i) => {
      values[i % gameConstants.ncol].push(value);
    });
    return values;
  },
  valuesByRow: () => {
    return utils.partition(state.cellValues, gameConstants.nrow);
  },
  valuesByCol: () => {
    let values = utils.arrayFill(Array(gameConstants.ncol), []);
    state.cellValues.forEach((value, i) => {
      values[i % gameConstants.ncol].push(value);
    });
    return values;
  },
  updateValue: (values, order = commonConstants.order.FORWARD) => {
    const { FORWARD, BACKWORD } = commonConstants.order;
    return values.map(row => {
      let [f, m, l] = order === FORWARD ? row : [...row].reverse();
      if (m === 0) {
        (m = l), (l = 0);
      }
      if (f === 0) {
        (f = m), (m = l), (l = 0);
      }
      if (f === m) {
        (f = f + m), (m = l), (l = 0);
      } else if (m === l) {
        (m = m + l), (l = 0);
      }
      return order === FORWARD ? [f, m, l] : [f, m, l].reverse();
    });
  },
  iaValuesEqual: (v1, v2) => {
    const _v1 = utils.combine(v1);
    const _v2 = utils.combine(v2);
    if (_v1.length !== _v2.length) {
      return false;
    }
    for (let i = 0; i < _v1.length; i++) {
      if (_v1[i] !== _v2[i]) return false;
    }
    return true;
  },
  isGameOver: () => {
    if (state.cellValues.includes(0)) {
      return false;
    }
    const canContinue = state.cellValues.some(
      (v, i) =>
        v === state.cellValues[i + gameConstants.ncol] ||
        ((i + 1) % gameConstants.ncol !== 0 && v === state.cellValues[i + 1])
    );
    return !canContinue;
},
saveHistory: () => {
    state.history.push([...state.cellValues]);
    if(state.history.length >= gameConstants.maxHistory){
        state.history = state.history.slice(gameConstants.maxHistory/2)
    }
},
logStep: (value) => {
    state.step = state.step + value;
}
};

window.onload = () => {
  process.initailCellValues();
  process.refreshUI();
  process.addEventListener();
};

const process = {
  initailCellValues: () => {
    const { ncol, nrow } = gameConstants;
    const values = Array(nrow * ncol).fill(0);
    state.cellValues = dataUtils.addNewValue(values);
    console.log("cell values are: ", state.cellValues);
  },
  refreshUI: () => {
    const cells = ElementGetter.getCells();
    console.log("refreshUI: ", JSON.stringify(state.cellValues));
    cells.forEach((cell, i) => {
      const value = state.cellValues[i];
      cell.textContent = value || "";
      cell.style.fontSize = gameConstants.styleMapping[value].fontSize + "px";
      cell.style.backgroundColor = gameConstants.styleMapping[value].bgcolor;
    });
    const stepSpan = ElementGetter.stepSpan()
    stepSpan.textContent = state.step
  },
  addEventListener: () => {
    document.addEventListener("keydown", EventHandler.keypress);
  },
  gameOver: () => {
    const banner = ElementGetter.banner();
    banner.textContent = commonConstants.GAME_OVER;
    banner.style.color = "#f71100";
    banner.style.display = "flex";
  },
  congratulate: () => {
    const banner = ElementGetter.banner();
    banner.textContent = commonConstants.WIN;
    banner.style.color = "#ffeb3b";
    banner.style.display = "flex";
  }
};

const EventHandler = {
  keypress: event => {
    console.log("press key: ", commonConstants.eventKey[event.keyCode]);
    if (Object.values(commonConstants.eventKey).includes(event.keyCode)) {
      const newValues = EventHandler.do(dataUtils.updateValue)(event.keyCode);
      if (newValues) {
        console.log("new values are: ", newValues);
        dataUtils.saveHistory();
        dataUtils.logStep(1)
        state.cellValues = newValues;
      }
      console.log("------------------------------------------");
      if (state.cellValues.includes(gameConstants.winPoint)) {
        console.log("you are winner!");
        state.win = true
        process.congratulate();
        document.removeEventListener("keydown", EventHandler.keypress);
      }
      if (dataUtils.isGameOver()) {
          state.over = true
        console.log("game over!");
        process.gameOver();
        document.removeEventListener("keydown", EventHandler.keypress);
      }
      process.refreshUI();
    }
  },
  do: toChange => {
    return key => {
      const byRow = gameConstants.rowDirection[key];
      const dirOrder = gameConstants.directionOrder[key];
      const values = dataUtils.getCellValues(byRow);

      console.log("old arrangement: ", JSON.stringify(values));

      let newValues = toChange(values, dirOrder);

      console.log("new arrangement: ", JSON.stringify(newValues));
      if (dataUtils.iaValuesEqual(values, newValues)) {
        return;
      }
      const oneLineValues = utils.combine(newValues, byRow);
      return dataUtils.addNewValue(oneLineValues);
    };
  },
  reset: () => {
    if (state.history.length > 0) {
      state.cellValues = state.history.pop();
      if(state.over){
          state.over = false
          const banner = ElementGetter.banner();
          banner.textContent = "";
          banner.style.color = "";
          banner.style.display = "";
          document.addEventListener("keydown", EventHandler.keypress);
      }
      dataUtils.logStep(-1)
      process.refreshUI();
    }
  }
};

const ElementGetter = {
  getCells: (byRow = null) => {
    const allCells = [...document.getElementsByClassName("cell")];
    if (byRow === null) {
      return allCells;
    }
    const cellsByRow = utils.partition(allCells, gameConstants.nrow);
    if (!byRow) {
      let cellByCol = [];
      for (let i = 0; i < gameConstants.ncol; i++) {
        let col = cellsByRow.map(row => row[i]);
        cellByCol.push(col);
      }
      return cellByCol;
    }
    return cellsByRow;
  },
  getGameGrid: () => {
    return document.getElementById("game-grid");
  },
  banner: () => {
    return document.getElementById("banner");
},
stepSpan: () => {
    return document.getElementById("step");
}
};
