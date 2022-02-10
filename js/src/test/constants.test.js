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

  describe("Test Game Constants", function() {
    const { direction, styleMapping, mode } = gameConstants;

    it("should gameConstants incldes 6 properties", function() {
      expect(Object.keys(gameConstants)).to.have.lengthOf(5);
    });

    it("should includes maxHistory and cellSize constants", function() {
      expect(gameConstants.maxHistory).to.equal(100);
      expect(gameConstants.cellSize).to.equal(110);
    });

    it("should direction includes 4 directions and thier attributes", function() {
      expect(Object.keys(direction)).to.have.lengthOf(4);
      expect(direction[37]).to.include({ isRow: true, order: 1 });
      expect(direction[38]).to.include({ isRow: false, order: 1 });
      expect(direction[39]).to.include({ isRow: true, order: -1 });
      expect(direction[40]).to.include({ isRow: false, order: -1 });
    });

    it("should styleMapping stores background color and font size for different numbers", function() {
      expect(Object.keys(styleMapping)).to.have.lengthOf(12);
      expect(styleMapping).to.have.deep.property(0, {
        bgcolor: "",
        fontSize: 40
      });
      expect(styleMapping).to.have.deep.property(2, {
        bgcolor: "#a5dfe3",
        fontSize: 64
      });
      expect(styleMapping).to.have.deep.property(4, {
        bgcolor: "#88d9df",
        fontSize: 62
      });
      expect(styleMapping).to.have.deep.property(8, {
        bgcolor: "#76dae1",
        fontSize: 60
      });
      expect(styleMapping).to.have.deep.property(16, {
        bgcolor: "#5dcdd7",
        fontSize: 56
      });
      expect(styleMapping).to.have.deep.property(32, {
        bgcolor: "#45cbd7",
        fontSize: 54
      });
      expect(styleMapping).to.have.deep.property(64, {
        bgcolor: "#27c6d5",
        fontSize: 52
      });
      expect(styleMapping).to.have.deep.property(128, {
        bgcolor: "#07c3d5",
        fontSize: 48
      });
      expect(styleMapping).to.have.deep.property(256, {
        bgcolor: "#04aaba",
        fontSize: 46
      });
      expect(styleMapping).to.have.deep.property(512, {
        bgcolor: "#1295a1",
        fontSize: 44
      });
      expect(styleMapping).to.have.deep.property(1024, {
        bgcolor: "#097680",
        fontSize: 40
      });
      expect(styleMapping).to.have.deep.property(2048, {
        bgcolor: "#035a61",
        fontSize: 40
      });
    });

    it("should different modes store nrow and ncol", function() {
      expect(Object.keys(mode)).to.have.lengthOf(3);
      expect(mode).to.have.deep.property(33, { nrow: 3, ncol: 3 });
      expect(mode).to.have.deep.property(44, { nrow: 4, ncol: 4 });
      expect(mode).to.have.deep.property(55, { nrow: 5, ncol: 5 });
    });
  });
});
