'use strict';
var R = require('Ramda');
var moment = require('moment');
var math = require('mathjs');

var interestRates = [
  {
    rate: 0.015,
    periodStart: moment({year: 2010, month: 8, day: 1}),
    periodEnd: moment({year: 2090})
  },
  {
    rate: 0,
    periodStart: moment({year: 2009, month: 8, day: 1}),
    periodEnd: moment({year: 2010, month: 7, day: 31})
  },
  {
    rate: 0.038,
    periodStart: moment({year: 2008, month: 8, day: 1}),
    periodEnd: moment({year: 2008, month: 11, day: 1})
  },
  {
    rate: 0.030,
    periodStart: moment({year: 2008, month: 11, day: 1}),
    periodEnd: moment({year: 2008, month: 11, day: 30})
  },
  {
    rate: 0.025,
    periodStart: moment({year: 2009, month: 0, day: 1}),
    periodEnd: moment({year: 2009, month: 1, day: 31})
  },
  {
    rate: 0.02,
    periodStart: moment({year: 2009, month: 1, day: 1}),
    periodEnd: moment({year: 2009, month: 2, day: 31})
  },
  {
    rate: 0.015,
    periodStart: moment({year: 2009, month: 3, day: 1}),
    periodEnd: moment({year: 2009, month: 7, day: 31})
  }
// 2009/10 0.0
// 6 March 2009 - 31 August 2009 1.5
// 6 February 2009 - 5 March 2009  2.0
// 9 January 2009 - 5 February 2009  2.5
// 5 December 2008 - 8 January 2009  3.0
// 1 September 2008 - 4 December 2008  3.8
// 2007/08 4.8
// 2006/07 2.4
// 2005/06 3.2
// 2004/05 2.6
// 2003/04 3.1
// 2002/03 1.3
// 2001/02 2.3
// 2000/01 2.6
// 1999/00 2.1
// 1998/99 3.5
];

module.exports.calculateInterestForMonth = function(date, sum){
  var rate = R.find(function(interestPeriod){
    var actualStartDate = interestPeriod.periodStart.subtract(1, 'day');
    var actualEndDate = interestPeriod.periodEnd;

    return date.isBetween(actualStartDate, actualEndDate);
  })(interestRates).rate;

  var result = rate * sum / 12;
  return math.round(result, 2);
};
