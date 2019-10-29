const { state, action, config, selector } = store;

const Row = function(values) {
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
  this.values = values;
  this.move = function() {
    this.values = move(this.values);
    return this;
  };
  this.fixed = function(length) {
    if (!length || length <= this.values.length) {
      return this;
    }
    let zeroArray = new Array(length - this.values.length).fill(0);
    this.values = this.values.concat(zeroArray);
    return this;
  };
};

Object.freeze(Row);

const process = {
  initailCellValues: () => {
    const { ncol, nrow } = config;
    const values = Array(nrow * ncol).fill(0);
    action.setCellValues(values);
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
  },
  ready: () => {
    const [index, value] = selector.newCell();
    if (index > -1) {
      action.updateCellValue(index, value);
      UIRefresher.cell(index, value);
    }
  }
};
