'use strict';

var loanTransferCalculator = require('./loanTransferCalculator');
var interestCalculaltor = require('./interestCalculator');
var repaymentCalculator = require('./repaymentCalculator');
var R = require('ramda');
var math = require('mathjs');

module.exports.getRepaymentDetailsForMonth = function(date, studyYears, jobs, previousMonth) {
  var emptyMonth = {
    loanPaidIn: 0,
    repayments: 0,
    interest: 0,
    totalDebt: 0
  };
  var lastStudyYear = R.last(studyYears);

  previousMonth = previousMonth || emptyMonth;

  var loanTransferForMonth = loanTransferCalculator.getLoanTransferForMonth(studyYears, date);
  var thisMonthDebt = previousMonth.totalDebt + loanTransferForMonth.payment;
  var interest = interestCalculaltor.calculateInterestForMonth(date, thisMonthDebt);
  var thisMonthRepayment = repaymentCalculator.calculateRepaymentForMonth(lastStudyYear, jobs, date);

  return {
    loanPaidIn: loanTransferForMonth.payment,
    repayments: thisMonthRepayment,
    interest: interest,
    totalDebt: math.round(thisMonthDebt - thisMonthRepayment + interest, 2),
  };
};
