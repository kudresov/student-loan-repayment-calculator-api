'use strict';

var moment = require('moment');

function getMonthDays(month) {
  var result = [];
  var daysInMonth = month.daysInMonth();
  
  for (var i = month.date(); i <= daysInMonth; i++) {
    var newDay = moment(month).date(i);
    result.push(newDay);
  }

  return result;
}


function getMonthsBetween(startDate, endDate) {
  var dates = [];

  while (startDate.isBefore(endDate) || startDate.isSame(endDate)){
    dates.push(moment(startDate));
    startDate.add(1, 'months');
  }

  return dates;
}

module.exports.getMonthDays = getMonthDays;
module.exports.getMonthsBetween = getMonthsBetween;