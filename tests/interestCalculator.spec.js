'use strict';

var chai = require('chai');
var moment = require('moment');
chai.should();

var interestCalculator = require('../routes/loanCalculator/interestCalculator');

describe('calculate interest for month', function() {

  var tests = [
    {
      debt: 1000,
      date: 'Jan-2011',
      expectedInterest: 1.27
    },
    {
      debt: 1000,
      date: 'Jan-2010',
      expectedInterest: 0
    },
    {
      debt: 1000,
      date: 'Aug-2010',
      expectedInterest: 0
    },
    {
      debt: 1000,
      date: 'Apr-2011',
      expectedInterest: 1.23
    },
    {
      debt: 1000,
      date: 'Sep-2008',
      expectedInterest: 3.12
    },
    {
      debt: 1000,
      date: 'Dec-2008',
      expectedInterest: 2.64
    },
    {
      debt: 1000,
      date: 'Jan-2009',
      expectedInterest: 2.23
    },      
    {
      debt: 1000,
      date: 'Feb-2009',
      expectedInterest: 1.60
    },
    {
      debt: 1000,
      date: 'Mar-2009',
      expectedInterest: 1.34
    },
    {
      debt: 10000,
      date: 'Feb-2009',
      expectedInterest: 16.03
    },
    {
      debt: 0,
      date: 'Feb-2009',
      expectedInterest: 0
    }
  ];

  function interestTest(test) {
    it(test.date + ' should have interest of ' + test.expectedInterest, function() {
      var period = moment(test.date, 'MMM-YYYY');
      var result = interestCalculator.calculateInterestForMonth(period, test.debt);
      result.should.equal(test.expectedInterest);
    });
  }

  tests.forEach(interestTest);
});
