'use strict';

const chai   = require('chai'),
      expect = chai.expect,
      mixedRadix = require('../../lib'),
      _ = require('lodash');



describe('exported object', function() {

  const places = [4,3,2];

  describe('#createMixedRadix', function() {

    it('creates MixedRadix object with places and divs', function() {
      const mr = mixedRadix.createMixedRadix({places});

      expect(mr._places).to.eql([Infinity].concat(places));
      expect(mr._divs).to.eql([Infinity, 24,6,2]);
    });

  });

  describe('#convert', function() {

    it('converts 33 to [4,3,2] based [1,1,1,1] number', function() {

      const mrn = mixedRadix.convert(33, places);
      expect(mrn._array).to.eql([1,1,1,1]);

    });

  });

});

describe('MixedRadix', function() {

  const places = [4,3,2];

  describe('#fromArray', function() {


  });

  describe('#convert', function() {

    it('converts 33 to 1,1,1,1 in 4,3,2 base', function() {
      const mr = mixedRadix.fromArray(places);

      const result = mr.convert(33)._array
      expect(result).to.eql([1,1,1,1]);
    });

    it('converts 0 to 0,0,0,0 in 4,3,2 base', function() {
      const mr = mixedRadix.fromArray(places);

      const result = mr.convert(0)._array
      expect(result).to.eql([0,0,0,0]);
    });

  });

  describe('#add', function() {

    it('adds 10 and 23 to get 20', function() {
      const mr = mixedRadix.fromArray(places);

      const n1 = mr.convert(23);
      const n2 = mr.convert(10);
      const result = mr.add(n1, n2);
      expect(result._array).to.eql([1,1,1,1]);
    });

  });

  describe('#toNumber', function() {

    it('converts [1,1,1,1] back to 33', function() {
      const mr = mixedRadix.fromArray(places);

      const n = mr.convert(33);
      const result = mr.toNumber(n);
      expect(result).to.equal(33);
    });

  });

});


describe('MRNumber', function() {
  let places, mr;

  beforeEach(function() {

    places = [4,3,2];
    mr = mixedRadix.fromArray(places);
  });

  describe('#place', function() {

    it('gets the 0 place number', function() {
      const mrn = mr.convert(1)
      const place = mrn.place(0);

      expect(place).to.equal(1);
    });

  });

  describe('#toString', function() {

    it('turns 33 into the string "1, 1, 1, 1;"', function() {
      const mrn = mr.convert(33);
      const str = mrn.toString();

      expect(str).to.equal('1, 1, 1, 1;');
    });
  });

  describe('#add', function() {

    it('adds 10 and 23 and gets 33', function() {
      const n1 = mr.convert(10);
      const n2 = mr.convert(23);

      const n3 = n1.add(n2);

      expect(n3._array).to.eql([1,1,1,1]);
    });

  });

});
