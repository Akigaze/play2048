const utils = {
  partition: (array, parts = 1) => {
    const sizeOfPart = Math.ceil(array.length / parts);
    let result = [];
    for (let i = 0; i < parts; i++) {
      let row = array.slice(i * sizeOfPart, (i + 1) * sizeOfPart);
      result.push(row);
    }
    return result;
  },
  combine: (array, byRow = true) => {
    if (!byRow) {
      const parts = Math.max.apply(null, array.map(item => item.length));
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
  },
  modeConvert: param => {
    const toString = obj => {
      const _nrow = Number(obj.nrow);
      const _ncol = Number(obj.ncol);
      if (!isNaN(_nrow) && !isNaN(_ncol)) {
        return Number(`${_nrow}${_ncol}`);
      }
      return null;
    };
    const toObject = value => {
      const _value = value.toString();
      const middle = Math.floor(_value.length / 2);
      return {
        nrow: Number(_value.slice(0, middle)),
        ncol: Number(_value.slice(middle))
      };
    };
    if (param) {
      const _type = typeof param;
      if (_type === "object") {
        return toString(param);
      }
      if (_type === "number" || _type === "string") {
        return toObject(param);
      }
    }
    return null;
  },
  isEmpty: value => {
    if (![null, undefined, NaN, ""].includes(value)) {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      if (Object.getPrototypeOf(value) === Object.prototype) {
        return Object.keys(value).length === 0;
      }
      return false;
    }
    return true;
  }
};
