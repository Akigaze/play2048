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
    if (typeof value === "function") {
      return array.fill(null).map(() => value());
    }
    return array.fill(value);
  },
  example: sample => {
    if (Array.isArray(sample) && sample.length > 0) {
      return sample[Math.floor(Math.random() * sample.length)];
    }
    return NaN;
  },
  count: (array, condition) => {
    return array.filter(condition).length;
  },
  indexesOf: (array, value) => {
    const indexes = [];
    if (Array.isArray(array)) {
      array.forEach((v, i) => v === value && indexes.push(i));
    }
    return indexes;
  }
};
