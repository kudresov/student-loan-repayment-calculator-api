'use strict';

var chai = require('chai');
chai.should();

var interestCalculator = require('../routes/loanCalculator/interestCalculator');

describe('with 1000£ debt', function(){

  describe('calculate interest for 2011', function(){

    it('should be 15£', function(){
      var result = interestCalculator.calculateInterestForYear(2011, 1000);
      result.should.equal(15);
    });
  });

  describe('calculate interest for 2010', function(){

    it('should be 0£', function(){
      var result = interestCalculator.calculateInterestForYear(2010, 1000);
      result.should.equal(0);
    });
  });

  describe('calculate interest for first year 2013', function(){
    
    it('should be 8.75£', function(){
      var result = interestCalculator.calculateInterestForFirstYear(2010, 1000);
      result.should.equal(0);
    });
  });
});