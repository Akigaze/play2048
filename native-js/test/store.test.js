describe("Store", function() {
  const expect = chai.expect;
  describe("State", function() {
    const { state, config } = store;

    it("should create initialState", function() {
      expect(state.over).to.be.false;
      expect(state.win).to.be.false;
      expect(state.history).to.be.empty;
      expect(state.cellValues).to.be.empty;
      expect(state.step).to.equal(0);
    });
  });

  describe("Config", function() {
    it("should config includes mode, nrow, ncol and winPoint", function() {
      expect(Object.keys(config)).to.have.lengthOf(4);
      expect(config.mode).to.eql({ nrow: 3, ncol: 3 });
      expect(config.nrow).to.equal(3);
      expect(config.ncol).to.equal(3);
      expect(config.winPoint).to.equal(512);
    });
  });

  describe("Action", function() {
    const _store = JSON.parse(JSON.stringify(store));
    beforeEach(function() {
      for (let key in _store) {
        if (!utils.isEmpty(_store[key])) {
          store[key] = _store[key];
        }
      }
    });

    it("should set cell values with given values", function() {
      store.action.setCellValues(["dog", "lion"]);

      expect(store.state.cellValues).to.eql(["dog", "lion"]);
    });

    it("should set the specify cell value with index", function() {
      store.state.cellValues = ["dog", "lion"];
      store.action.updateCellValue(1, "tiger");

      expect(store.state.cellValues).to.eql(["dog", "tiger"]);
    });

    it("should set current cell values as one item of history list", function() {
      store.state.cellValues = ["dog", "lion"];
      store.action.saveHistory();

      expect(store.state.history).to.have.lengthOf(1);
      expect(store.state.history[0]).to.eql(["dog", "lion"]);
    });

    it("should append current cell values as one item of history list", function() {
      store.state.cellValues = ["dog", "lion"];
      store.state.history = [["cat", "tiger"]];
      store.action.saveHistory();

      expect(store.state.history).to.have.lengthOf(2);
      expect(store.state.history[0]).to.eql(["cat", "tiger"]);
      expect(store.state.history[1]).to.eql(["dog", "lion"]);
    });

    it("should reduce history list to half when lenght of history list more than max size", function() {
      store.state.cellValues = ["dog", "lion"];
      store.state.history = new Array(99).fill([1]);
      store.action.saveHistory();

      expect(store.state.history).to.have.lengthOf(50);
      expect(store.state.history[49]).to.eql(["dog", "lion"]);
    });
  });
});
