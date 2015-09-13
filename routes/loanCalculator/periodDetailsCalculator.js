'use strict';

var R = require('ramda');
var moment = require('moment');
var monthDetailsCalculator = require('./monthDetailsCalculator');
var dateUtil = require('./dateUtils');

module.exports.getRepaymentDetailsForPeriod = function(date, studyYears, jobs) {
  var firstStudyYear = studyYears[0];
  var firstMonth = moment.utc({year: firstStudyYear, month: 8});
  var months = dateUtil.getMonthsBetween(firstMonth, date);

  var result = [];
  months.forEach(function(month){
    var currentMonthIndex = months.indexOf(month);
    var previousMonth = result[currentMonthIndex - 1];
    var monthDetails = monthDetailsCalculator.getRepaymentDetailsForMonth(month, studyYears, jobs, previousMonth);
    result.push(monthDetails);
  });

  return result;
};