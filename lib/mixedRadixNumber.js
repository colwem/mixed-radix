'use strict';

const _ = require('lodash'),
      numeralSystem = require('./numeralSystem'),
      common = require('./common'),
      mul = common.mul,
      add = common.add,
      assert = require('assert');

module.exports = create;

function create(value, radices, radixPoint) {
  assert(value && radices);

  let ns = numeralSystem(radices, radixPoint);
  let mrn = Object.create(MixedRadixNumber);

  mrn._ns = ns;
  mrn._value = value;

  return mrn;
}

create.fromRepresentation =
  function fromRepresentation(repr, radices, radixPoint) {

  assert(repr && radices);

  repr = repr.concat().reverse();
  const reprLen = repr.length;
  repr.length = radices.length + 1;
  repr.fill(0, reprLen);
  repr = repr.concat().reverse();

  let ns = numeralSystem(radices, radixPoint);
  let mrn = Object.create(MixedRadixNumber);

  mrn._ns = ns;
  mrn._representation = repr;

  return mrn;
}

create.withNs = function(value, ns) {
  assert(value && ns);

  let mrn = Object.create(MixedRadixNumber);

  mrn._ns = ns;
  mrn._value = value;

  return mrn;
}

const MixedRadixNumber =  {

  _ns: null,
  _radixPoint: 0,

  atPlace(place) {
    const len = this.representation().length;

    place = place - this._radixPoint;

    assert(place >= 0);
    assert(place < len);

    return this.representation()[len - place - 1];
  },

  _radices() {
    return this._ns._radices;
  },

  _powers() {
    return this._ns._powers;
  },

  representation() {
    if (this._representation) {
      return this._representation;
    }

    let remainder = this._value;
    let powersTail = this._powers();

    let representation = powersTail.map( function(pow) {
      let result =  Math.floor( remainder / pow );
      remainder = remainder - result * pow;

      return result;
    });
    representation[representation.length - 1] += remainder;
    this._representation = representation;

    return representation;
  },

  shiftPoint(shift) {
    assert(shift);
    return create.fromRepresentation(
      this.representation(),
      this._ns._radices,
      this._ns._radixPoint + shift)
  },

  toString() {
    return this.representation().join(', ') + ';';
  },

  toUnicodeString() {
    let subscriptBaseCodePoint = 0x2080;

    return _.zipWith(this.representation(), this._radices(), (v, p) => {
      if( p === Infinity ) {

        return v + String.fromCodePoint(0x2092, 0x2092);
      }

      return v + splitNumber(p)
        .map(add(subscriptBaseCodePoint))
        .map((s) => {

          return String.fromCodePoint(s);
        }).join('');

    }).join('');
  },

  add(n) {
    return this._ns.add(this, n);
  },

  mul(n) {
    return this._ns.mul(this, n);
  },

  value() {
    if (this._value) {
      return this._value;
    }

    const value = _.zipWith(
        this.representation(),
        this._ns._powers,
        mul
      ).reduce(add, 0);

    this._value = value;

    return this._value;
  },

  toArray() {
    return this.representation();
  }
}
