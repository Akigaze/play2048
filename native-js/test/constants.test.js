describe("Constants", function() {
  const expect = chai.expect;

  describe("Test Common Constants", function() {
    const { EVENT_KEY, ORDER, CLASS, ANIMATION } = commonConstants;

    it("should commonConstants contains 7 properties", function() {
      expect(Object.keys(commonConstants)).to.have.lengthOf(7);
    });

    it("should event keys include UP, DOWN, LEFT and RIGHT", function() {
      expect(Object.keys(EVENT_KEY)).to.have.lengthOf(8);
      expect(EVENT_KEY["UP"]).to.equal(38);
      expect(EVENT_KEY["DOWN"]).to.equal(40);
      expect(EVENT_KEY["LEFT"]).to.equal(37);
      expect(EVENT_KEY["RIGHT"]).to.equal(39);
      expect(EVENT_KEY["38"]).to.equal("UP");
      expect(EVENT_KEY["40"]).to.equal("DOWN");
      expect(EVENT_KEY["37"]).to.equal("LEFT");
      expect(EVENT_KEY["39"]).to.equal("RIGHT");
    });

    it("should order includes FORWARD and BACKWORD", function() {
      expect(Object.keys(ORDER)).to.have.lengthOf(2);
      expect(ORDER.FORWARD).to.equal(1);
      expect(ORDER.BACKWORD).to.equal(-1);
    });

    it("should animation includes OUT and IN", function() {
      expect(Object.keys(ANIMATION)).to.have.lengthOf(2);
      expect(ANIMATION.OUT).to.equal("setting-out");
      expect(ANIMATION.IN).to.equal("setting-in");
    });

    it("should class includes SELECT_MODE and ROCKET_ACTIVE", function() {
      expect(Object.keys(CLASS)).to.have.lengthOf(2);
      expect(CLASS.SELECT_MODE).to.equal("select-mode");
      expect(CLASS.ROCKET_ACTIVE).to.equal("rocket-active");
    });

    it("should include GAME_OVER, WIN and LOSER Constants", function() {
      expect(commonConstants.GAME_OVER).to.equal("GAME OVER!");
      expect(commonConstants.WIN).to.equal("WIN!");
      expect(commonConstants.LOSER).to.equal("ಥ_ಥ");
    });
  });
});
