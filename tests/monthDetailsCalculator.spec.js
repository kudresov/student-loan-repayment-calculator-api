/* jshint expr:true */
'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
chai.should();

var monthDetailsCalculator = require('../routes/loanCalculator/monthDetailsCalculator');

describe('Repayment Details Calcuator', function() {
  it('should exist', function() {
    monthDetailsCalculator.should.exist;
  });

  var tests = [
    {
      studyYears: [2008, 2009, 2010],
      jobs: [],
      testMonth: moment('Sep-2008', 'MMM-YYYY'),
      expectedData: {
        loanPaidIn: 0,
        repayments: 0,
        interest: 0,
        totalDebt: 0,
      }
    },
    {
      studyYears: [2010, 2011, 2012],
      jobs: [],
      testMonth: moment('Feb-2011', 'MMM-YYYY'),
      expectedData: {
        loanPaidIn: 1612.5,
        repayments: 0,
        interest: 1.86,
        totalDebt: 1614.36,
      }
    },
    {
      studyYears: [2010, 2011, 2012],
      jobs: [],
      testMonth: moment('Mar-2011', 'MMM-YYYY'),
      expectedData: {
        loanPaidIn: 0,
        repayments: 0,
        interest: 2.06,
        totalDebt: 1616.42,
      },
      previousMonth: {
        loanPaidIn: 1612.5,
        repayments: 0,
        interest: 1.86,
        totalDebt: 1614.36,
      }
    },
    {
      studyYears: [2012],
      testMonth: moment('Apr-2014', 'MMM-YYYY'),
      jobs: [{
                startDate: '2013-09-01T00:00:00.000Z',
                endDate: '2015-09-01T00:00:00.000Z',
                basicSalary: 30000
              }],
      expectedData: {
        loanPaidIn: 0,
        repayments: 94.99,
        interest: 12.39,
        totalDebt: 9967.4,
      },
      previousMonth: {
        loanPaidIn: 10000,
        repayments: 0,
        interest: 0,
        totalDebt: 10050,
      }
    } 
  ];

  var totalTests = [
    {
      studyYears: [2010, 2011, 2012],
      testMonth: moment('Apr-2014', 'MMM-YYYY'),
      jobs: [{
                startDate: '2013-09-01T00:00:00.000Z',
                endDate: '2015-09-01T00:00:00.000Z',
                basicSalary: 30000
              }],
      expectedData: [
      ]      
    }
  ];

  function totalRepaymentTest(test){
    describe('with study years ' + test.studyYears, function(){
      describe('for date ' + tests.testMonth.format(), function(){
        var repaymentDetails;

        beforeEach(function() {
          repaymentDetails = monthDetailsCalculator.getRepaymentDetailsForPeriod(test.testMonth, test.studyYears, test.jobs);
        });

        it('should have correct number of months', function(){
          expect(repaymentDetails.length).to.equal(12);
        });
      });
    });
  }

  function repaymentTest(test) {

    describe('with study years ' + test.studyYears, function() {

      describe('with 30k salary starting 1-Apr-2011', function() {

        var repaymentDetails;

        beforeEach(function() {
          repaymentDetails = monthDetailsCalculator.getRepaymentDetailsForMonth(test.testMonth, test.studyYears, test.jobs, test.previousMonth);
        });

        it('should have correct repayment info', function() {
          expect(repaymentDetails).to.deep.equal(test.expectedData);
        });
      });
    });
  }

  // totalTests.forEach(totalRepaymentTest);
  tests.forEach(repaymentTest);
});