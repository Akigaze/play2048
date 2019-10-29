// const {state, action} = store

const UIRefresher = (function() {
  const renderCell = function(cell, value) {
    cell.textContent = value || "";
    cell.style.fontSize = gameConstants.styleMapping[value].fontSize + "px";
    cell.style.backgroundColor = gameConstants.styleMapping[value].bgcolor;
  };

  return {
    grid: (values, refresh = true) => {
      if (refresh) {
        const cells = ElementGetter.gridCells();
        cells.forEach((cell, i) => {
          const value = values[i];
          renderCell(cell, value);
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
      const ncell = config.nrow * config.ncol;
      for (let i = 0; i < ncell; i++) {
        let node = cellTemplate.cloneNode();
        node.id = `cell-${i}`;
        gameGrid.appendChild(node);
      }
      gameGrid.style.width = config.ncol * gameConstants.cellSize + "px";
      gameGrid.style.height = config.nrow * gameConstants.cellSize + "px";
    },
    cell: (index, value) => {
      const cell = ElementGetter.cell(index);
      if (cell) {
        renderCell(cell, value);
      }
    }
  };
})();

const ElementGetter = {
  gridCells: (byRow = null) => {
    const allCells = [...document.getElementsByClassName("cell")];
    if (byRow === null) {
      return allCells;
    }
    const cellsByRow = utils.partition(allCells, config.nrow);
    if (!byRow) {
      let cellByCol = [];
      for (let i = 0; i < config.ncol; i++) {
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
  },
  cell: index => {
    return document.getElementById(`cell-${index}`);
  }
};

const EventHandler = {
  keypress: event => {
    console.log("press key: ", commonConstants.EVENT_KEY[event.keyCode]);
    if (Object.values(commonConstants.EVENT_KEY).includes(event.keyCode)) {
      const newValues = EventHandler.do(action.updateValue)(event.keyCode);
      if (newValues) {
        console.log("new values are: ", newValues);
        action.saveHistory();
        action.logStep(1);
        state.cellValues = newValues;
      }
      console.log("------------------------------------------");
      switch (true) {
        case selector.isWon(): {
          console.log("you are winner!");
          state.win = true;
          document.removeEventListener("keydown", EventHandler.keypress);
          break;
        }
        case selector.isGameOver(): {
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
      const byRow = gameConstants.direction[key].isRow;
      const dirOrder = gameConstants.direction[key].order;
      const values = selector.getCellValues(byRow);

      console.log("old arrangement: ", JSON.stringify(values));

      let newValues = toChange(values, dirOrder);

      console.log("new arrangement: ", JSON.stringify(newValues));
      if (selector.iaValuesEqual(values, newValues)) {
        return;
      }
      const oneLineValues = utils.combine(newValues, byRow);
      return selector.addNewValue(oneLineValues);
    };
  },
  reset: () => {
    if (state.history.length > 0) {
      state.cellValues = state.history.pop();
      if (state.over) {
        state.over = false;
        document.addEventListener("keydown", EventHandler.keypress);
      }
      action.logStep(-1);
      process.refreshUI(true, true);
    }
  },
  delete: () => {
    const { nrow, ncol } = config;
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
    if (utils.modeConvert(config.mode) != selectedMode) {
      action.setMode(selectedMode);
      action.reset();
      UIRefresher.layoutChange();
      process.initailCellValues();
      process.refreshUI();
      process.ready();
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
          action.modifyCellValue(index, 0);
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
