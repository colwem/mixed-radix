'use strict';

const _ = require('lodash');


module.exports = {

  createMixedRadix(options) {
    const mr = Object.assign(Object.create(MixedRadix), options);

    if(mr.places) {
      mr.setPlaces(mr.places);
      delete mr.places;
    }

    return mr;
  },

  convert(number, places) {
    const mr = this.createMixedRadix({places});
    return mr.convert(number);
  },

  fromArray(places) {
    var mr = Object.create(MixedRadix);

    mr.setPlaces(places);
    return mr;
  }
}


const MixedRadix = {

  _upperEndBase: Infinity,

  _lowerEndBase: Infinity,

  setPlaces(places) {

    if(places[0] !== Infinity) {
      places = [Infinity].concat(places);
    }
    this._places = places;

    this._divs = mapReduce(places.concat().reverse(), mul, 1).concat().reverse();

  },

  lowerEndBase(base) {
    this._lowerEndBase = base;
  },

  upperEndBase(base) {
    this._upperEndBase = base;
  },

  convert(n) {
    let remainder = n;
    let tail = this._divs.slice(1);

    let numberArray = tail.map( function(div) {
      let result =  Math.floor( remainder / div );
      remainder = remainder - result * div;

      return result;
    });
    numberArray.push(remainder);

    return createNumber(this, numberArray);
  },

  add(mrn1, mrn2) {

    const arr1 = mrn1._array;
    const arr2 = mrn2._array;

    let temp = _.zipWith(arr1, arr2, sum);
    temp = _.zip(temp, this._places);
    let reversed = temp.concat().reverse();

    let carry = 0;
    const result = reversed.map((pair) => {
      let v = pair[0],
          b = pair[1];

      let result = carry + v

      carry = 0;
      if (result >= b) {
        result = result -b;
        carry = 1;
      }

      return result;
    }).concat().reverse();

    return createNumber(this, result )
  },

  toNumber(mrn) {
    return _.zipWith(
        mrn._array,
        mrn._mr._divs.slice(1).concat([1]),
        mul
      ).reduce(sum, 0);
  }


}

function createNumber(mr, array) {
  let mrn = Object.create(MRNumber);

  mrn._mr = mr;
  mrn._array = array;

  return mrn;
}

const MRNumber =  {

  _mr: null,
  _radixPoint: 0,

  place(place) {
    return this._array[this._array.length - place - 1];
  },

  toString() {
    return this._array.join(', ') + ';';
  },

  toUnicodeRepr() {

  },

  add(n) {
    return this._mr.add(this, n);
  },

  toNumber() {
    return this._mr.toNumber(this);
  }
}



var mul = (x, y) => x * y;
var sum = (x, y) => x + y;

function mapReduce(array, fn, initial) {

  return array.reduce((acc, x) => {

    return acc.concat(fn(acc.slice(-1)[0], x))
  }, [initial]).slice(1);
}
