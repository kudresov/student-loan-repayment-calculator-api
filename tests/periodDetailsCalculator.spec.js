'use strict';

var chai = require('chai');
var moment = require('moment');
var R = require('ramda');
var expect = chai.expect;

var periodDetailsCalculator = require('../routes/loanCalculator/periodDetailsCalculator');

describe('Period Details Calculator', function() {
  it('should exist', function(){
    expect(periodDetailsCalculator).to.exist;
  });
});

var scenario1 = {
  studyYears: [2008, 2009, 2010],
  jobs: [],
  testMonth: moment('Sep-2008', 'MMM-YYYY'),
  expectedData: {
    month: moment('Sep-2008', 'MMM-YYYY'),
    loanPaidIn: 0,
    repayments: 0,
    interest: 0,
    totalDebt: 0,
  },
  assertedMonth: 0,
  expectedMonthsCount: 1
};

var scenario2 = R.clone(scenario1);
var month = moment('Oct-2008', 'MMM-YYYY');
scenario2.testMonth = month;
scenario2.expectedData.month = month;
scenario2.expectedMonthsCount = 2;
scenario2.assertedMonth = 1;

var scenario3 = {
  studyYears: [2008, 2009, 2010],
  jobs: [],
  testMonth: moment('Mar-2009', 'MMM-YYYY'),
  expectedData: {
    month: moment('Mar-2009', 'MMM-YYYY'),
    loanPaidIn: 0,
    repayments: 0,
    interest: 2.54,
    totalDebt: 1577.56,
  },
  assertedMonth: 0,
  expectedMonthsCount: 7
};


var tests = [scenario3];

function testPeriodDetailsCalculation(test){
  describe.only('with sutdy years ' + test.studyYears, function(){
    describe('with period until ' + test.testMonth.format(), function(){
      var periods;

      beforeEach(function(){
        periods = periodDetailsCalculator.getRepaymentDetailsForMonth(test.testMonth, test.studyYears, test.jobs);
      });

      it('should have correct number of months', function(){
        expect(periods.length).to.equal(test.expectedMonthsCount);
      });

      it('should return correct months details', function(){
        var data = periods[test.assertedMonth];
        expect(data).to.deep.equal(test.expectedData);
      });
    });
  });
}

tests.forEach(testPeriodDetailsCalculation);