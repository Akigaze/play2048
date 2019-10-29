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

  describe("Action", function() {});
});
