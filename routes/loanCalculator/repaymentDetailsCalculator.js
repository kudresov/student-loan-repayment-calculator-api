'use strict';

var loanTransferCalculator = require('./loanTransferCalculator');
var interestCalculaltor = require('./interestCalculator');

module.exports.getRepaymentDetailsForMonth = function(date, studyYears, jobs, previousMonth) {
  var loanTransferForMonth = loanTransferCalculator.getLoanTransferForMonth(studyYears, date);
  previousMonth = previousMonth || {totalDebt: 0};
  console.log('----');
  console.log(date.format());


  console.log(interest);

  if (loanTransferForMonth === null) {
    return [{
          loanPaidIn: 0,
          repayments: 0,
          interest: 0,
          totalDebt: 0,
        }];
  }else {
    var thisMonthDebt = previousMonth.totalDebt + loanTransferForMonth.payment;
    var interest = interestCalculaltor.calculateInterestForMonth(date, thisMonthDebt);
    
    return [{
      loanPaidIn: loanTransferForMonth.payment,
      repayments: 0,
      interest: interest,
      totalDebt: 0,
    }];
  }
};