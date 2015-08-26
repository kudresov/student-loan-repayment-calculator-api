'use strict';

var chai = require('chai');
chai.should();

var totalLoanCalculator = require('../routes/loanCalculator/totalLoanCalculator');

describe('Calculate total loan for years', function(){
  describe('2008-2011 and gap year in 2010', function(){
    it('should have a total loan of 9745£', function(){
      var studyYears = [2008, 2009, 2011];
      var totalLoan = totalLoanCalculator.calculateTotalLoan(studyYears);
      totalLoan.should.equal(9745);
    });
  });

  describe('2008-2010', function(){
    it('should have a total loan of 9745£', function(){
      var studyYears = [2008, 2009, 2011];
      var totalLoan = totalLoanCalculator.calculateTotalLoan(studyYears);
      totalLoan.should.equal(9745);
    });
  });
});