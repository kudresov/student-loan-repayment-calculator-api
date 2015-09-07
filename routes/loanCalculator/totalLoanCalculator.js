'use strict';

var R = require('Ramda');

var tuitionFeeService = require('./tuitionFeeService');

module.exports.calculateTotalLoan = function(studyYears) {
  var studyYearsData = tuitionFeeService.getStudyYears(studyYears);
  var selectTuitionFee = function(tuitionYear) {
    return tuitionYear.fee;
  };

  var tuitionFees = studyYearsData.map(selectTuitionFee);
  var totalLoan = R.sum(tuitionFees);

  return totalLoan;
};