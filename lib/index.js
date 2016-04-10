'use strict';

const _ = require('lodash'),
      mixedRadixNumber = require('./mixedRadixNumber');


mixedRadixNumber.numeralSystem = require('./numeralSystem');
module.exports = mixedRadixNumber;


/*
 * {
 *   convert(number, places) {
 *     const mr = this.createMixedRadix({places});
 *     return mr.convert(number);
 *   },
 *
 *   fromArray(places) {
 *     var mr = Object.create(MixedRadix);
 *
 *     mr.setPlaces(places);
 *     return mr;
 *   }
 * }
 */


