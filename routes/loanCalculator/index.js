'use strict';

var repaymentCalculator = require('./repaymentCalculator');
var totalLoanCalcualator = require('./totalLoanCalculator');
var periodDetailsCalculator = require('./periodDetailsCalculator');
var R = require('Ramda');
var moment = require('moment');

module.exports.validation = require('./validation');

module.exports.route = function (req, res) {
  var data = req.body;
  var studyYears = data.studyYears;
  var lastStudyYear = R.last(studyYears);
  var jobs = data.jobs || [];
  var thisMonth = moment.utc({day: 1, hour: 0, minute: 0, second: 0, millisecond: 0});

  var totalLoan = totalLoanCalcualator.calculateTotalLoan(studyYears);
  var repaymentsInfo = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
  var reapaymentDetails = periodDetailsCalculator.getRepaymentDetailsForPeriod(thisMonth, studyYears, jobs);

  var result = {
    lastRepaymentDate: '2023-04-01T00:00:00.511Z',
    lastRepaymentSum: 24.5,
    projectedMonthlyRepayment: 300.20,
    totalLoan: totalLoan,
    totalRepaid: repaymentsInfo.total,
    details: reapaymentDetails
  };

  res.status(201).send(result);
};