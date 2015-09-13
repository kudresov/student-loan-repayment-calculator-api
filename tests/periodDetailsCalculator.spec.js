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
  testMonth: moment.utc('Sep-2008', 'MMM-YYYY'),
  assertions: [
    {
      month: 0,
      data: {
        month: moment.utc('Sep-2008', 'MMM-YYYY'),
        debtBroughForward: 0,
        loanPaidIn: 0,
        repayments: 0,
        interest: 0,
        totalDebt: 0,
      }
    }
  ],
  expectedMonthsCount: 1
};

var scenario2 = {
  studyYears: [2008, 2009, 2010],
  jobs: [],
  testMonth: moment.utc('Nov-2008', 'MMM-YYYY'),
  assertions: [
    {
      month: 0,
      data: {
        month: moment.utc('Sep-2008', 'MMM-YYYY'),
        debtBroughForward: 0,
        loanPaidIn: 0,
        repayments: 0,
        interest: 0,
        totalDebt: 0,
      }
    },
    {
      month: 1,
      data: {
        month: moment.utc('Oct-2008', 'MMM-YYYY'),
        debtBroughForward: 0,
        loanPaidIn: 0,
        repayments: 0,
        interest: 0,
        totalDebt: 0,
      }
    },
    {
      month: 2,
      data: {
        month: moment.utc('Nov-2008', 'MMM-YYYY'),
        debtBroughForward: 0,
        loanPaidIn: 0,
        repayments: 0,
        interest: 0,
        totalDebt: 0,
      }
    }
  ],
  expectedMonthsCount: 3
};

var scenario3 = {
  studyYears: [2008, 2009, 2010],
  jobs: [],
  testMonth: moment.utc('Mar-2009', 'MMM-YYYY'),
  assertions: [
    {
      month: 6,
      data: {
        month: moment.utc('Mar-2009', 'MMM-YYYY'),
        debtBroughForward: 1575.02,
        loanPaidIn: 0,
        repayments: 0,
        interest: 2.11,
        totalDebt: 1577.13,
      }
    }
  ],
  expectedMonthsCount: 7
};

var tests = [scenario1, scenario2, scenario3];

function testPeriodDetailsCalculation(test){
  describe('with sutdy years ' + test.studyYears, function(){
    describe('with period until ' + test.testMonth.format(), function(){
      var periods;

      beforeEach(function(){
        periods = periodDetailsCalculator.getRepaymentDetailsForPeriod(test.testMonth, test.studyYears, test.jobs);
      });

      it('should have correct number of months', function(){
        expect(periods.length).to.equal(test.expectedMonthsCount);
      });

      function checkMonthDetails(assertion){
        it('should return correct months details', function(){
          var data = periods[assertion.month];
          expect(data.month.format()).to.equal(assertion.data.month.format());
          delete data.month;
          delete assertion.data.month;
          expect(data).to.deep.equal(assertion.data);
        });
      }

      test.assertions.forEach(checkMonthDetails);
    });
  });
}

tests.forEach(testPeriodDetailsCalculation);