'use strict';

var R = require('ramda');
var moment = require('moment');
var monthDetailsCalculator = require('./monthDetailsCalculator');
var dateUtil = require('./dateUtils');

function getPeriodsData(months, studyYears, jobs){
  var result = [];
  months.forEach(function(month){
    var currentMonthIndex = months.indexOf(month);
    var previousMonth = result[currentMonthIndex - 1];
    var monthDetails = monthDetailsCalculator.getRepaymentDetailsForMonth(month, studyYears, jobs, previousMonth);
    result.push(monthDetails);
  });

  return result;
}

module.exports.getRepaymentDetailsForPeriod = function(date, studyYears, jobs) {
  var firstStudyYear = studyYears[0];
  var firstMonth = moment.utc({year: firstStudyYear, month: 8});
  var months = dateUtil.getMonthsBetween(firstMonth, date);

  var result = getPeriodsData(months, studyYears, jobs);
  var montsStillInRepayment = function(month){
    if (!month) {
      return false;
    }

    return month.debtBroughForward >= 0;
  };

  var filteredResult = R.filter(montsStillInRepayment, result);

  return filteredResult;
};