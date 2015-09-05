'use strict';

var moment = require('moment');

function getMonthDays(month) {
  var result = [];
  var daysInMonth = month.daysInMonth();
  
  for (var i = 1; i <= daysInMonth; i++) {
    var newDay = moment(month).date(i);
    result.push(newDay);
  }

  return result;
}

module.exports.getMonthDays = getMonthDays;