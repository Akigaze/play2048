const store = new (function Store(){
    const initialState = {
      over: false,
      win: false,
      history: [],
      step: 0,
      cellValues: []
    };

    const initialConfig = {
        mode: 33,
        nrow: 3,
        ncol: 3,
        winPoint: 512
    }

    this.state = JSON.parse(JSON.stringify(initialState));
    this.config = JSON.parse(JSON.stringify(initialConfig));
    this.getter = {
        newCell: () => {
          const indexesOf0 = utils.indexesOf(this.state.cellValues, 0);
          const index = utils.example(indexesOf0);
          console.log("add new value for: ", indexesOf0, " at: ", index);
          return [index, 2];
        },
    }
    this.action = {
        setCellValues: (values) => this.state.cellValues = values,
        newCell: () => {
            const indexesOf0 = utils.indexesOf(this.state.cellValues, 0);
            const index = utils.example(indexesOf0);
            console.log("add new value for: ", indexesOf0, " at: ", index);
            return [index, 2]
        },
        updateCellValue: (index, value) => {
            this.state.cellValues[index] = value;
        },
      addNewValue: (values = state.cellValues) => {
        const nextValues = [...values];
        const indexesOf0 = utils.indexesOf(nextValues, 0);
        const index = utils.example(indexesOf0);
        console.log("add new value for: ", indexesOf0, " at: ", index);
        if (Number.isNaN(index)) {
          return nextValues;
        }
        nextValues[index] = 2;
        return nextValues;
      },
      getCellValues: (byRow = true) => {
        if (byRow) {
          return utils.partition(this.state.cellValues, this.config.nrow);
        }
        let values = utils.arrayFill(Array(this.config.ncol), []);
        this.state.cellValues.forEach((value, i) => {
          values[i % this.config.ncol].push(value);
        });
        return values;
      },
      modifyCellValue: (index, value) => {
        if (index >= 0 && index < this.state.cellValues.length) {
          if (utils.count(this.state.cellValues, value => value > 0) > 1) {
            this.state.cellValues[index] = value;
          } else {
            alert("there is only one, can not delete");
            console.log("there is only one, can not delete");
          }
        } else {
          console.log("invalid element");
        }
      },
      valuesByRow: () => {
        return utils.partition(this.state.cellValues, this.config.nrow);
      },
      valuesByCol: () => {
        let values = utils.arrayFill(Array(this.config.ncol), []);
        this.state.cellValues.forEach((value, i) => {
          values[i % this.config.ncol].push(value);
        });
        return values;
      },
      updateValue: (values, order = commonConstants.ORDER.FORWARD) => {
        const { FORWARD, BACKWORD } = commonConstants.ORDER;
        return values.map(data => {
          let row = new Row(order === FORWARD ? data : [...data].reverse())
            .move()
            .fixed(data.length);
          return order === FORWARD ? row.values : row.values.reverse();
        });
      },
      // TODO: move to utils
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
        if (this.state.cellValues.includes(0)) {
          return false;
        }
        const canContinue = this.state.cellValues.some(
          (v, i) =>
            v === this.state.cellValues[i + this.config.ncol] ||
            ((i + 1) % this.config.ncol !== 0 && v === this.state.cellValues[i + 1])
        );
        return !canContinue;
      },
      isWon: () => {
        return this.state.cellValues.includes(this.config.winPoint);
      },
      saveHistory: () => {
        this.state.history.push([...this.state.cellValues]);
        if (this.state.history.length >= gameConstants.maxHistory) {
          this.state.history = this.state.history.slice(gameConstants.maxHistory / 2);
        }
      },
      logStep: value => {
        this.state.step += value;
      },
      reset: () => {
        Object.assign(this.state, JSON.parse(JSON.stringify(initialState)));
    },

    setMode: mode => {
      this.config.mode = parseInt(mode);
      this.config.ncol = this.config.mode % 10;
      this.config.nrow = (this.config.mode - this.config.ncol) / 10;
      this.config.winPoint = 2 ** (this.config.ncol * this.config.nrow);
    }
    };
})()
