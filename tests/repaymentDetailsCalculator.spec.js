/* jshint expr:true */
'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
chai.should();

var repaymentDetailsCalculator = require('../routes/loanCalculator/repaymentDetailsCalculator');

describe.only('Repayment Details Calcuator', function() {
  it('should exist', function() {
    repaymentDetailsCalculator.should.exist;
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
        interest: 1.66,
        totalDebt: 0,
      }
    }   
  ];

  function repaymentTest(test) {

    describe('with study years ' + test.studyYears, function() {

      describe('with 30k salary starting 1-Apr-2011', function() {

        var repaymentDetails;

        beforeEach(function() {
          repaymentDetails = repaymentDetailsCalculator.getRepaymentDetailsForMonth(test.testMonth, test.studyYears, test.jobs, test.previousMonth);
        });

        it('should have 1 payment', function() {
          expect(repaymentDetails.length).to.equal(1);
        });

        it('should have correct repayment info', function() {
          expect(repaymentDetails[0]).to.deep.equal(test.expectedData);
        });
      });
    });
  }

  tests.forEach(repaymentTest);
});