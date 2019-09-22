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
  },
  cellSize: 110
};

const GameConfig = {
  mode: 33,
  nrow: 3,
  ncol: 3,
  winPoint: 512
};

const configUtils = {
  setMode: mode => {
    GameConfig.mode = parseInt(mode);
    GameConfig.ncol = GameConfig.mode % 10;
    GameConfig.nrow = (GameConfig.mode - GameConfig.ncol) / 10;
    GameConfig.winPoint = 2 ** (GameConfig.ncol * GameConfig.nrow);
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
  },
  count: (array, condition) => {
    return array.filter(condition).length;
  }
};

const Row = function(values) {
  this.values = [...values];
  let move = function(values) {
    if (values.length <= 1) {
      return values;
    }
    let value = values[0];
    if (value === 0) {
      return move(values.slice(1));
    }
    for (let i = 1; i < values.length; i++) {
      if (values[i] !== 0 && values[i] !== value) {
        return [value, ...move(values.slice(i))];
      }
      if (values[i] === value) {
        return [2 * value, ...move(values.slice(i + 1))];
      }
    }
    return values;
  };
  this.move = function() {
    this.values = move(this.values);
    return this;
  };
  this.fixed = function(bit) {
    if (!bit || bit <= this.values.length) {
      return this;
    }
    let zeroArray = new Array(bit - this.values.length).fill(0);
    this.values = this.values.concat(zeroArray);
    return this;
  };
};

const initialState = {
  over: false,
  win: false,
  history: [],
  step: 0,
  cellValues: []
};

const state = JSON.parse(JSON.stringify(initialState));

const dataUtils = {
  addNewValue: (values = state.cellValues) => {
    const newValues = [...values];
    const indexesOf0 = newValues
      .map((v, i) => (v ? -1 : i))
      .filter(v => v > -1);
    const index = utils.example(indexesOf0);
    console.log("add new value for: ", indexesOf0, " at: ", index);
    if (Number.isNaN(index)) {
      return newValues;
    }
    newValues[index] = 2;
    return newValues;
  },
  getCellValues: (byRow = true) => {
    if (byRow) {
      return utils.partition(state.cellValues, GameConfig.nrow);
    }
    let values = utils.arrayFill(Array(GameConfig.ncol), []);
    state.cellValues.forEach((value, i) => {
      values[i % GameConfig.ncol].push(value);
    });
    return values;
  },
  modifyCellValue: (index, value) => {
    if (index >= 0 && index < state.cellValues.length) {
      if (utils.count(state.cellValues, value => value > 0) > 1) {
        state.cellValues[index] = value;
      } else {
        alert("there is only one, can not delete");
        console.log("there is only one, can not delete");
      }
    } else {
      console.log("invalid element");
    }
  },
  valuesByRow: () => {
    return utils.partition(state.cellValues, GameConfig.nrow);
  },
  valuesByCol: () => {
    let values = utils.arrayFill(Array(GameConfig.ncol), []);
    state.cellValues.forEach((value, i) => {
      values[i % GameConfig.ncol].push(value);
    });
    return values;
  },
  updateValue: (values, order = commonConstants.order.FORWARD) => {
    const { FORWARD, BACKWORD } = commonConstants.order;
    return values.map(data => {
      let row = new Row(order === FORWARD ? data : [...data].reverse())
        .move()
        .fixed(data.length);
      return order === FORWARD ? row.values : row.values.reverse();
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
        v === state.cellValues[i + GameConfig.ncol] ||
        ((i + 1) % GameConfig.ncol !== 0 && v === state.cellValues[i + 1])
    );
    return !canContinue;
  },
  isWon: () => {
    return state.cellValues.includes(GameConfig.winPoint);
  },
  saveHistory: () => {
    state.history.push([...state.cellValues]);
    if (state.history.length >= gameConstants.maxHistory) {
      state.history = state.history.slice(gameConstants.maxHistory / 2);
    }
  },
  logStep: value => {
    state.step = state.step + value;
  },
  reset: () => {
    Object.assign(state, JSON.parse(JSON.stringify(initialState)));
  }
};

window.onload = () => {
  process.initailCellValues();
  process.refreshUI();
  process.addEventListener();
};

const process = {
  initailCellValues: () => {
    const { ncol, nrow } = GameConfig;
    const values = Array(nrow * ncol).fill(0);
    state.cellValues = dataUtils.addNewValue(values);
    console.log("cell values are: ", state.cellValues);
  },
  refreshUI: (refreshGrid = true, reset = false) => {
    UIRefresher.grid(state.cellValues, refreshGrid);
    UIRefresher.step(state.step, state.over);
    UIRefresher.gameOver(state.over, reset);
    UIRefresher.win(state.win);
  },
  addEventListener: () => {
    document.addEventListener("keydown", EventHandler.keypress);
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
        dataUtils.logStep(1);
        state.cellValues = newValues;
      }
      console.log("------------------------------------------");
      switch (true) {
        case dataUtils.isWon(): {
          console.log("you are winner!");
          state.win = true;
          document.removeEventListener("keydown", EventHandler.keypress);
          break;
        }
        case dataUtils.isGameOver(): {
          state.over = true;
          console.log("game over!");
          document.removeEventListener("keydown", EventHandler.keypress);
        }
      }
      process.refreshUI(!!newValues);
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
      if (state.over) {
        state.over = false;
        document.addEventListener("keydown", EventHandler.keypress);
      }
      dataUtils.logStep(-1);
      process.refreshUI(true, true);
    }
  },
  delete: () => {
    const { nrow, ncol } = GameConfig;
    const dead = Math.floor(Math.random() * nrow * ncol);
    if (utils.count(state.cellValues, value => value > 0) > 1) {
      console.log(`delete ${state.cellValues[dead]} at ${dead}`);
      state.cellValues[dead] = 0;
      process.refreshUI();
      return;
    }
    alert("there is only one, can not delete");
    console.log("there is only one, can not delete");
  },
  openSetting: event => {
    event.stopPropagation();
    UIRefresher.explodeMode(false);
    const settingPannel = ElementGetter.settingPannel();
    const { OUT, IN } = commonConstants.ANIMATION;
    settingPannel.style.display = "";
    const isToOpten = !settingPannel.classList.contains(OUT);
    UIRefresher.settingPannel(isToOpten);
    const closeSettingPannel = function(event) {
      if (!settingPannel.contains(event.target)) {
        UIRefresher.settingPannel(false);
        document.removeEventListener("click", closeSettingPannel);
      }
    };
    EventHandler.eventSupplement(
      closeSettingPannel,
      "click",
      document,
      isToOpten
    );
  },
  checkMode: () => {
    const selectedMode = ElementGetter.modeRadios(true)[0].value;
    if (GameConfig.mode != selectedMode) {
      configUtils.setMode(selectedMode);
      dataUtils.reset();
      UIRefresher.layoutChange();
      process.initailCellValues();
      process.refreshUI();
    }
    // UIRefresher.settingPannel(false);
  },
  eventSupplement: (handler, type = "click", target = document, add = true) => {
    if (add) {
      target.addEventListener(type, handler);
    } else {
      target.removeEventListener(type, handler);
    }
  },
  seeExplodeMode: event => {
    event.stopPropagation();
    UIRefresher.settingPannel(false);
    const explodeMode = ElementGetter.explodeMode();
    const { OUT, IN } = commonConstants.ANIMATION;
    explodeMode.style.display = "";
    const isToOpten = !explodeMode.classList.contains(OUT);
    UIRefresher.explodeMode(isToOpten);
    const closeExplodeMode = function(event) {
      if (!explodeMode.contains(event.target)) {
        UIRefresher.explodeMode(false);
        document.removeEventListener("click", closeExplodeMode);
      }
    };
    EventHandler.eventSupplement(
      closeExplodeMode,
      "click",
      document,
      isToOpten
    );
  },
  selectToDelete: event => {
    const { ROCKET_ACTIVE, SELECT_MODE } = commonConstants.CLASS;
    const rocket = event.target;
    rocket.classList.add(ROCKET_ACTIVE);
    console.log("select one guy to delete");
    let elements = ElementGetter.gridCells().concat(ElementGetter.menuItems());
    elements.forEach(el => {
      el.classList.add(SELECT_MODE);
      el.addEventListener("click", bomb, true);
    });
    function bomb(event) {
      event.stopPropagation();
      const classList = this.classList;
      if (classList.contains(SELECT_MODE)) {
        if (classList.contains("cell")) {
          const index = ElementGetter.gridCells().indexOf(this);
          dataUtils.modifyCellValue(index, 0);
          UIRefresher.grid(state.cellValues);
        } else {
          this.style.display = "none";
        }
      }
      rocket.classList.remove(ROCKET_ACTIVE);
      ElementGetter.selectModes().forEach(el => {
        el.classList.remove(SELECT_MODE);
        el.removeEventListener("click", bomb, true);
      });
    }
  }
};

const UIRefresher = {
  grid: (values, refresh = true) => {
    if (refresh) {
      const cells = ElementGetter.gridCells();
      cells.forEach((cell, i) => {
        const value = values[i];
        cell.textContent = value || "";
        cell.style.fontSize = gameConstants.styleMapping[value].fontSize + "px";
        cell.style.backgroundColor = gameConstants.styleMapping[value].bgcolor;
      });
    }
  },
  gameOver: (over = false, reset = false) => {
    const banner = ElementGetter.banner();
    if (over && !reset) {
      banner.textContent = commonConstants.GAME_OVER;
      banner.style.color = "#f71100";
      banner.style.display = "flex";
    }
    if (reset) {
      banner.textContent = "";
      banner.style.color = "";
      banner.style.display = "";
    }
  },
  win: (won = false) => {
    if (won) {
      const banner = ElementGetter.banner();
      banner.textContent = commonConstants.WIN;
      banner.style.color = "#ffeb3b";
      banner.style.display = "flex";
    }
  },
  step: (count, over = false) => {
    const stepSpan = ElementGetter.stepSpan();
    stepSpan.textContent = over ? commonConstants.LOSER : count;
  },
  settingPannel: (toOpen = true) => {
    const settingPannel = ElementGetter.settingPannel();
    const { OUT, IN } = commonConstants.ANIMATION;
    if (toOpen) {
      settingPannel.classList.remove(IN);
      settingPannel.classList.add(OUT);
    } else {
      settingPannel.classList.remove(OUT);
      settingPannel.classList.add(IN);
    }
  },
  explodeMode: (toOpen = true) => {
    const explodeMode = ElementGetter.explodeMode();
    const { OUT, IN } = commonConstants.ANIMATION;
    if (toOpen) {
      explodeMode.classList.remove(IN);
      explodeMode.classList.add(OUT);
    } else {
      explodeMode.classList.remove(OUT);
      explodeMode.classList.add(IN);
    }
  },
  layoutChange: () => {
    const gameGrid = ElementGetter.gameGrid();
    let cellTemplate = ElementGetter.gridCells()[0].cloneNode();
    gameGrid.innerHTML = "";
    for (let i = 0; i < GameConfig.nrow; i++) {
      for (let j = 0; j < GameConfig.ncol; j++) {
        let node = cellTemplate.cloneNode();
        node.id = `cell-${i}-${j}`;
        gameGrid.appendChild(node);
      }
    }
    gameGrid.style.width = GameConfig.ncol * gameConstants.cellSize + "px";
    gameGrid.style.height = GameConfig.nrow * gameConstants.cellSize + "px";
  }
};

const ElementGetter = {
  gridCells: (byRow = null) => {
    const allCells = [...document.getElementsByClassName("cell")];
    if (byRow === null) {
      return allCells;
    }
    const cellsByRow = utils.partition(allCells, GameConfig.nrow);
    if (!byRow) {
      let cellByCol = [];
      for (let i = 0; i < GameConfig.ncol; i++) {
        let col = cellsByRow.map(row => row[i]);
        cellByCol.push(col);
      }
      return cellByCol;
    }
    return cellsByRow;
  },
  gameGrid: () => {
    return document.getElementById("game-grid");
  },
  banner: () => {
    return document.getElementById("banner");
  },
  stepSpan: () => {
    return document.getElementById("step");
  },
  settingPannel: () => {
    return document.getElementById("setting-pannel");
  },
  modeRadios: (checked = null) => {
    let modeList = [...document.getElementsByName("mode")];
    switch (checked) {
      case null:
        return modeList;
      case true:
        return modeList.filter(e => e.checked);
      case false:
        return modeList.filter(e => !e.checked);
    }
  },
  explodeMode: () => {
    return document.getElementById("rocket-mode");
  },
  menuItems: () => {
    const menu = document.getElementById("menu");
    return [...menu.children];
  },
  selectModes: () => {
    const els = document.getElementsByClassName(
      commonConstants.CLASS.SELECT_MODE
    );
    return [...els];
  }
};
