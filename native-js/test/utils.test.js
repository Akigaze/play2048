const {
  indexesOf,
  count,
  example,
  arrayFill,
  partition,
  combine,
  modeConvert
} = utils;

describe("Utils", function() {
  const expect = chai.expect;
  const spy = sinon.spy;

  describe("indexesOf", function() {
    it("should return all indexes of given item in the array", function() {
      const pets = ["tiger", "dog", "snake", "dog"];
      let indexes = indexesOf(pets, "dog");

      expect(indexes).to.have.lengthOf(2);
      expect(indexes[0]).to.equal(1);
      expect(indexes[1]).to.equal(3);
    });

    it("should return empty if given item can't be found in array", function() {
      const pets = ["tiger", "dog", "snake", "dog"];
      let indexes = indexesOf(pets, "cat");

      expect(indexes).to.be.empty;
    });

    it("should return empty if no given an array", function() {
      const pets = "I have tiger, dog, snake, dog";
      let indexes = indexesOf(pets, "cat");

      expect(indexes).to.be.empty;
    });
  });

  describe("count", function() {
    it("should return the count of items matched the condition within the given array ", function() {
      const array = [2, 12, 5, 23, 7, 16];
      const condition = item => item > 10;

      const result = count(array, condition);
      expect(result).to.equal(3);
    });
  });

  describe("example", function() {
    it("should return any one of the given array at random", function() {
      const sample = ["dog", "cat", "tiger", "bird", "monkey"];
      const one = example(sample);

      expect(one).to.be.oneOf(sample);
    });

    it("should return NaN when not give an array", function() {
      const sample = "I have tiger, dog, snake, dog";
      const one = example(sample);

      expect(one).to.be.NaN;
    });

    it("should return NaN when the given array is empty", function() {
      const sample = [];
      const one = example(sample);

      expect(one).to.be.NaN;
    });
  });

  describe("arrayFill", function() {
    it("should fill the given array with specify primitive value", function() {
      const result = arrayFill(new Array(5), "dog");

      expect(result).to.have.lengthOf(5);
      expect(new Set(result)).to.have.lengthOf(1);
      expect(new Set(result)).to.include("dog");
    });

    it("should fill the given array with specify object", function() {
      const dog = { name: "wang" };
      const result = arrayFill(new Array(5), dog);

      expect(result).to.have.lengthOf(5);
      expect(new Set(result)).to.have.lengthOf(1);
      expect(new Set(result)).to.include(dog);
    });

    it("should fill the given array with specify object", function() {
      const dog = { name: "wang" };
      const result = arrayFill(new Array(5), dog);

      expect(result).to.have.lengthOf(5);
      expect(new Set(result)).to.have.lengthOf(1);
      expect(new Set(result)).to.include(dog);
    });

    it("should fill the given array with the return value of given function", function() {
      const fn = spy({ spy: Array }, "spy");
      const result = arrayFill(new Array(5), fn);

      expect(result).to.have.lengthOf(5);
      expect(fn.callCount).to.equal(5);
      expect(result).to.eql(fn.returnValues);
    });
  });

  describe("partition", function() {
    it("should divide the given array into specify parts", function() {
      const array = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = partition(array, 3);

      expect(result).to.have.lengthOf(3);
      expect(result[0]).to.have.members([1, 2, 3]);
      expect(result[1]).to.have.members([4, 5, 6]);
      expect(result[2]).to.have.members([7, 8]);
    });

    it("should return the original array when miss part", function() {
      const array = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = partition(array);

      expect(result).to.have.lengthOf(1);
      expect(result[0]).to.deep.equal(array);
    });
  });

  describe("combine", function() {
    it("should combine all sub array into one big array by row", function() {
      const array = [["cat", "dog"], ["apple", "lemon"], ["car"]];
      const result = combine(array);

      expect(result).to.have.lengthOf(5);
      expect(result).to.have.members(["cat", "dog", "apple", "lemon", "car"]);
    });

    it("should combine all sub array into one big array by column", function() {
      const array = [["cat", "dog"], ["apple", "lemon"], ["car"]];
      const result = combine(array, false);

      expect(result).to.have.lengthOf(5);
      expect(result).to.have.members(["cat", "apple", "car", "dog", "lemon"]);
    });
  });

  describe("modeConvert", function() {
    it("should convert to number make up with nrow and ncol", function() {
      const result = modeConvert({ nrow: 3, ncol: 4 });

      expect(result).to.equal(34);
    });

    it("should convert to object with nrow and ncol from the given number", function() {
      const result = modeConvert(45);

      expect(result).to.eql({ nrow: 4, ncol: 5 });
    });
  });
});
