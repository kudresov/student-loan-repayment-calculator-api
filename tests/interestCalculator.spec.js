'use strict';

var chai = require('chai');
var moment = require('moment');
chai.should();

var interestCalculator = require('../routes/loanCalculator/interestCalculator');

describe('interest for', function() {
  
  describe('1000£ debt', function() {

    describe('calculate interest for Jan-2011', function() {

      it('should be 1.27£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Jan-2011', 'MMM-YYYY'), 1000);
        result.should.equal(1.27);
      });
    });

    describe('calculate interest for Jan-2010', function() {

      it('should be 0£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Jan-2010', 'MMM-YYYY'), 1000);
        result.should.equal(0);      
      });
    });

    describe('calculate interest for Aug-2010', function() {

      it('should be 0£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Aug-2010', 'MMM-YYYY'), 1000);
        result.should.equal(0);
      });
    });

    describe('calculate interest April-2011', function() {
      
      it('should be 1.23£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('April-2011', 'MMM-YYYY'), 1000);
        result.should.equal(1.23);
      });
    });

    describe('calculate interest Sep-2008', function() {
      
      it('should be 3.12£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Sep-2008', 'MMM-YYYY'), 1000);
        result.should.equal(3.12);
      });
    });

    describe('calculate interest Dec-2008', function() {
      
      it('should be 2.64£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Dec-2008', 'MMM-YYYY'), 1000);
        result.should.equal(2.64);
      });
    });

    describe('calculate interest Jan-2009', function() {
      
      it('should be 2.23£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Jan-2009', 'MMM-YYYY'), 1000);
        result.should.equal(2.23);
      });
    });

    describe('calculate interest Feb-2009', function() {
      
      it('should be 1.60£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Feb-2009', 'MMM-YYYY'), 1000);
        result.should.equal(1.60);
      });
    });

    describe('calculate interest March-2009', function() {
      
      it('should be 1.34£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Mar-2009', 'MMM-YYYY'), 1000);
        result.should.equal(1.34);
      });
    });

  });

  describe('10000£ debt', function() {
    describe('calculate interest for Feb-2009', function() {
      it('should be 16.03£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment('Feb-2009', 'MMM-YYYY'), 10000);
        result.should.equal(16.03);
      });
    });
  });

  describe('0£ debt', function() {
    describe('calculate interest for 2011', function() {

      it('should be 0.0£', function() {
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2011, month: 0}), 0);
        result.should.equal(0);
      });
    });
  });
});
