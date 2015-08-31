'use strict';

var chai = require('chai');
var moment = require('moment');
chai.should();

var interestCalculator = require('../routes/loanCalculator/interestCalculator');

describe('interest for', function(){
  
  describe('1000£ debt', function(){

    describe('calculate interest for Jan-2011', function(){

      it('should be 1.25£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2011, month: 0, day: 0}), 1000);
        result.should.equal(1.25);
      });
    });

    describe('calculate interest for Jan-2010', function(){

      it('should be 0£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2010, month: 0}), 1000);
        result.should.equal(0);
      });
    });

    describe('calculate interest for Aug 2010', function(){

      it('should be 0£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2010, month: 7}), 1000);
        result.should.equal(0);
      });
    });

    describe('calculate interest April for 2011', function(){
      
      it('should be 1.25£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2011, month: 0}), 1000);
        result.should.equal(1.25);
      });
    });

    describe('calculate interest Sep-2008', function(){
      
      it('should be 3.17£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2008, month: 8}), 1000);
        result.should.equal(3.17);
      });
    });

    describe('calculate interest Dec-2008', function(){
      
      it('should be 2.5£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2008, month: 11}), 1000);
        result.should.equal(2.5);
      });
    });

    describe('calculate interest Jan-2009', function(){
      
      it('should be 2.08£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2009, month: 0}), 1000);
        result.should.equal(2.08);
      });
    });

    describe('calculate interest Feb-2009', function(){
      
      it('should be 2.08£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2009, month: 1}), 1000);
        result.should.equal(2.08);
      });
    });

    describe('calculate interest March-2009', function(){
      
      xit('should be 1.25£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2009, month: 2}), 1000);
        result.should.equal(1.25);
      });
    });

  });

  describe('0£ debt', function(){
    describe('calculate interest for 2011', function(){

      it('should be 0.0£', function(){
        var result = interestCalculator.calculateInterestForMonth(moment({year: 2011, month: 0}), 0);
        result.should.equal(0);
      });
    });
  });
});
