'use strict';

const chai   = require('chai'),
      expect = chai.expect,
      mixedRadix = require('../../lib'),
      assert = require('assert'),
      _ = require('lodash');


let radices = [4,3,2];

describe('exposed API', function() {

  describe('mixedRadix()', function() {

    it('creates object', function() {
      let val = mixedRadix(4.1, radices, -1);
      let rep = val.representation();
    });

  });

  describe('mixedRadix.withNs()', function() {
    let ns;
    before(function()  {
      ns = mixedRadix.numeralSystem(radices);
    });

    it('creates mixedRadixNumber with ns', function() {
      let val = mixedRadix.withNs(40, ns)
    });

  });

});


describe('mixedRadixNumber', function() {

  describe('constructor', function() {

    it('creates mixed number', function() {
      expect(mixedRadix(40, radices)).to.be.ok;
    });

    it('asserts valid radixPoint', function() {
      expect(() => mixedRadix(40, radices, 3))
        .to.throw(assert.AssertionError)
      expect(() => mixedRadix(40, radices, -10))
        .to.throw(assert.AssertionError)
    });

    describe('#fromRepresentation', function() {

      it('creates number', function() {
        let rep = [1, 2, 2, 0];
        expect(mixedRadix.fromRepresentation(rep, radices)).to.be.ok;
        rep = [1, 2, 2];
        expect(mixedRadix.fromRepresentation(rep, radices)).to.be.ok;
        rep = [1, 2];
        expect(mixedRadix.fromRepresentation(rep, radices)).to.be.ok;
      });

      it('fills reps that are too short', function() {
        let rep = [2, 1];
        let mrn = mixedRadix.fromRepresentation(rep, radices);
        expect(mrn.representation()).to.eql([0,0,2,1]);
      });

      it('truncates representations that are too long', function() {
        let rep = [5, 1, 2, 2, 0];
        let mrn = mixedRadix.fromRepresentation(rep, radices);

        expect(mrn.representation()).to.eql([ 1, 2, 2, 0]);
      });

    });

  });

  describe('methods', function() {
    let mrn;

    beforeEach(function() {
      mrn = mixedRadix(40, radices);
    });

    describe('#atPlace', function() {

      it('returns value at place', function() {
        expect(mrn.atPlace(0)).to.equal(0);
        expect(mrn.atPlace(1)).to.equal(2);
        expect(mrn.atPlace(2)).to.equal(2);
        expect(mrn.atPlace(3)).to.equal(1);
      });

      it('errors when out of bounds', function() {
        expect(() => mrn.atPlace(-1)).to.throw(assert.AssertionError);
        expect(() => mrn.atPlace(4)).to.throw(assert.AssertionError);
      });

    });

    describe('#representation', function() {

      it('returns array representation', function() {
        expect(mrn.representation()).to.eql([1,2,2,0]);
      });

    });

    describe('#shiftPoint', function() {

      it('returns a new number', function() {
        expect(mrn.shiftPoint(-2)).to.be.ok;
      });

      it('needs a value', function() {
        expect(() => mrn.shiftPoint()).to.throw(assert.AssertionError);
      });

      it('converts seconds to hours', function() {
        let hours = mixedRadix(60 * 60 * 3, [24, 60, 60])
          .shiftPoint(-2).value();
        expect(hours).to.equal(3);
      });

    });

    describe('#value', function() {

      it('returns the value', function() {
        expect(mrn.value()).to.equal(40);
      });

      it('creates a value from representation', function() {
        let mrn = mixedRadix.fromRepresentation([1,2,2,0], radices);
        expect(mrn.value()).to.equal(40);
      });
    });


  });

});



/*
 * describe('exported object', function() {
 *
 *   const places = [4,3,2];
 *
 *   describe('#createMixedRadix', function() {
 *
 *     it('creates MixedRadix object with places and divs', function() {
 *       const mr = mixedRadix.createMixedRadix({places});
 *
 *       expect(mr._places).to.eql([Infinity].concat(places));
 *       expect(mr._divs).to.eql([Infinity, 24,6,2]);
 *     });
 *
 *   });
 *
 *   describe('#convert', function() {
 *
 *     it('converts 33 to [4,3,2] based [1,1,1,1] number', function() {
 *
 *       const mrn = mixedRadix.convert(33, places);
 *       expect(mrn._array).to.eql([1,1,1,1]);
 *
 *     });
 *
 *   });
 *
 * });
 *
 * describe('MixedRadix', function() {
 *
 *   const places = [4,3,2];
 *
 *   describe('#fromArray', function() {
 *
 *
 *   });
 *
 *   describe('#convert', function() {
 *
 *     it('converts 33 to 1,1,1,1 in 4,3,2 base', function() {
 *       const mr = mixedRadix.fromArray(places);
 *
 *       const result = mr.convert(33)._array
 *       expect(result).to.eql([1,1,1,1]);
 *     });
 *
 *     it('converts 0 to 0,0,0,0 in 4,3,2 base', function() {
 *       const mr = mixedRadix.fromArray(places);
 *
 *       const result = mr.convert(0)._array
 *       expect(result).to.eql([0,0,0,0]);
 *     });
 *
 *   });
 *
 *   describe('#add', function() {
 *
 *     it('adds 10 and 23 to get 20', function() {
 *       const mr = mixedRadix.fromArray(places);
 *
 *       const n1 = mr.convert(23);
 *       const n2 = mr.convert(10);
 *       const result = mr.add(n1, n2);
 *       expect(result._array).to.eql([1,1,1,1]);
 *     });
 *
 *   });
 *
 *   describe('#toNumber', function() {
 *
 *     it('converts [1,1,1,1] back to 33', function() {
 *       const mr = mixedRadix.fromArray(places);
 *
 *       const n = mr.convert(33);
 *       const result = mr.toNumber(n);
 *       expect(result).to.equal(33);
 *     });
 *
 *   });
 *
 * });
 *
 *
 * describe('MRNumber', function() {
 *   let places, mr;
 *
 *   beforeEach(function() {
 *
 *     places = [4,3,2];
 *     mr = mixedRadix.fromArray(places);
 *   });
 *
 *   describe('#place', function() {
 *
 *     it('gets the 0 place number', function() {
 *       const mrn = mr.convert(1)
 *       const place = mrn.place(0);
 *
 *       expect(place).to.equal(1);
 *     });
 *
 *     it('gets the 1 place number', function() {
 *       const mrn = mr.convert(1)
 *       const place = mrn.place(1);
 *
 *       expect(place).to.equal(0);
 *     });
 *
 *   });
 *
 *   describe('#toArray', function() {
 *
 *     it('turns returns the array"', function() {
 *       const mrn = mr.convert(33);
 *       const array = mrn.toArray();
 *
 *       expect(array).to.eql([1,1,1,1]);
 *     });
 *
 *   });
 *
 *   describe('#toString', function() {
 *
 *     it('turns 33 into the string "1, 1, 1, 1;"', function() {
 *       const mrn = mr.convert(33);
 *       const str = mrn.toString();
 *
 *       expect(str).to.equal('1, 1, 1, 1;');
 *     });
 *   });
 *
 *   describe('#toUnicodeString', function() {
 *
 *     it('turns 33 into the string "1, 1, 1, 1;"', function() {
 *       const mrn = mr.convert(33);
 *       const str = mrn.toUnicodeString();
 *
 *       expect(str).to.equal('1ₒₒ1₄1₃1₂');
 *     });
 *   });
 *
 *   describe('#add', function() {
 *
 *     it('adds 10 and 23 and gets 33', function() {
 *       const n1 = mr.convert(10);
 *       const n2 = mr.convert(23);
 *
 *       const n3 = n1.add(n2);
 *
 *       expect(n3._array).to.eql([1,1,1,1]);
 *     });
 *
 *   });
 *
 * });
 */
