'use strict';

var repaymentCalculator = require('./repaymentCalculator');
var R = require('Ramda');

module.exports.validation = require('./validation');

module.exports.route = function (req, res) {
  var data = req.body;
  var studyYears = data.studyYears;
  var lastStudyYear = R.last(studyYears);
  var jobs = data.jobs || [];

  var totalLoan = repaymentCalculator.calculateTotalLoan(studyYears);
  var repaymentsInfo = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);

  var result = {
    lastRepaymentDate: '2023-04-01T00:00:00.511Z',
    lastRepaymentSum: 24.5,
    projectedMonthlyRepayment: 300.20,
    totalLoan: totalLoan,
    totalRepaid: repaymentsInfo.total
  };

  res.status(201).send(result);
};