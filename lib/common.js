'use strict';

const _ = require('lodash');

module.exports = {
  splitNumber(n) {
    if( n === 0 ) {
      return [];
    }

    return splitNumber(Math.floor(n / 10)).concat(n % 10);
  },


  mul: _.curry((x, y) => x * y),
  add: _.curry((x, y) => x + y),
  sum: _.curry(arr => arr.reduce(this.add, 0)),
  product: _.curry(arr => arr.reduce(this.mul, 1)),

  mapReduce(array, fn, initial) {

    return array.reduce((acc, x) => {

      return acc.concat(fn(acc.slice(-1)[0], x))
    }, [initial]).slice(1);
  },

  getValue(n) {
    if( typeof n === 'number' ) {
      return n;
    }

    if( typeof n.value === 'function') {
      return n.value();
    }

    throw new TypeError('Not a value type');
  }
};
