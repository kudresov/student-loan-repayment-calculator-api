'use strict';

var _ = require('underscore');

var tuitionFees = [
  {
    startYear: 2005,
    fee: 1175
  },
  {
    startYear: 2006,
    fee: 3000
  },
  {
    startYear: 2007,
    fee: 3070
  },
  {
    startYear: 2008,
    fee: 3145
  },
  {
    startYear: 2009,
    fee: 3225
  },
  {
    startYear: 2010,
    fee: 3225 // TODO set correct one
  },
  {
    startYear: 2011,
    fee: 3375
  }
];

module.exports.validation = require('./validation');

module.exports.route = function (req, res) {
  var data = req.body;
  var studyYears = data.studyYears;

  var tuitionYearsFilter = function(studyYear){
    if (_.contains(studyYears, studyYear.startYear)) {
      return true;
    }else {
      return false;
    }
  };

  var sum = function(memo, fee){
    return memo + fee;
  };

  var totalTutionFees = _.filter(tuitionFees, tuitionYearsFilter)
                         .map(function(tuitionYear){
                           return tuitionYear.fee;
                         })
                         .reduce(sum);

  var result = {
    lastRepaymentDate: '2023-04-01T00:00:00.511Z',
    lastRepaymentSum: 24.5,
    projectedMonthlyRepayment: 300.20,
    totalRepayment: totalTutionFees
  };

  res.status(201).send(result);
};