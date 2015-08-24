'use strict';

var repaymentCalculator = require('./repaymentCalculator');

module.exports.validation = require('./validation');

module.exports.route = function (req, res) {
  var data = req.body;
  var studyYears = data.studyYears;
  var totalLoan = repaymentCalculator.calculateTotalLoan(studyYears);

  var result = {
    lastRepaymentDate: '2023-04-01T00:00:00.511Z',
    lastRepaymentSum: 24.5,
    projectedMonthlyRepayment: 300.20,
    totalLoan: totalLoan,
    totalRepaid: 569.93
  };

  res.status(201).send(result);
};