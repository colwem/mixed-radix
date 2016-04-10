'use strict';

const _                = require('lodash'),
      mixedRadixNumber = require('./mixedRadixNumber'),
      assert           = require('assert'),
      common           = require('./common'),
      mapReduce        = common.mapReduce,
      getValue         = common.getValue,
      mul              = common.mul,
      add              = common.add;



function create(radices, radixPoint) {
  assert(radices);

  radixPoint || (radixPoint = 0);
  assert(radixPoint <= 0);
  assert(radixPoint > - radices.length);

  const ns = Object.create(NumeralSystem);

  ns._setRadices(radices, radixPoint);

  return ns;
}

module.exports = create;


function NumeralSystem(value) {

  return mixedRadixNumber.withNs(this);
}


NumeralSystem._setRadices = function _setRadices(radices, radixPoint) {

  this._radixPoint = radixPoint || 0;

  this._radices = radices;

  const postPowers = makePowers(
    getPostRadixPointRadices(radices, radixPoint)
  ).map(n => 1 / n);

  const preRadices = getPreRadixPointRadices(radices, radixPoint).reverse();
  const prePowers = makePowers(preRadices).reverse();

  this._powers = prePowers.concat(1, postPowers);
}


NumeralSystem.setRadixPoint = function setRadixPoint(radixPoint) {
  return create(this._radices, radixPoint);
}


NumeralSystem.shiftPoint = function shiftPoint(shift) {
  return create(this._radices, this._radixPoint + shift);
}


NumeralSystem.add = function add(n, m) {

  n = getValue(n);
  m = getValue(m);

  return mixedRadixNumber.withNs(n + m, this);
}


NumeralSystem.mul = function mul(n, m) {

  n = getValue(n);
  m = getValue(m);

  return mixedRadixNumber.withNs(n * m, this);
}


function makePowers(radices) {
  return mapReduce(radices, mul, 1);
}

function getPostRadixPointRadices(radices, radixPoint) {
  return radices.concat(0).slice(radixPoint - 1).slice(0, -1);
}

function getPreRadixPointRadices(radices, radixPoint) {
  return radices.concat(0).slice(0, radixPoint -1);
}
