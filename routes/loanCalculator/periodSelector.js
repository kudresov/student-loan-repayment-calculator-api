'use strict';

var R = require('Ramda');
// var moment = require('moment');

module.exports.selectPeriod = function(periods, date){
  if(!periods) {
    return null;
  }

  var result = R.find(function(period){
    return date.isBetween(period.periodStart, period.periodEnd) ||
           date.isSame(period.periodStart) || 
           date.isSame(period.periodEnd);
  })(periods);

  return result;
};
