'use strict';

var moment = require('moment');
var math = require('mathjs');
var periodSelector = require('./periodSelector');
var R = require('ramda');
var dateUtils = require('./dateUtils');

var interestRates = [
  {
    rate: 0.015,
    periodEnd: moment.utc('1-Sep-2090', 'DD-MMM-YYYY'),
    periodStart: moment.utc('1-Sep-2010', 'DD-MMM-YYYY')
    
  },
  {
    rate: 0,
    periodEnd: moment.utc('31-Aug-2010', 'DD-MMM-YYYY'),
    periodStart: moment.utc('1-Sep-2009', 'DD-MMM-YYYY')
    
  },
  {
    rate: 0.015,
    periodEnd: moment.utc('31-Aug-2009', 'DD-MMM-YYYY'),
    periodStart: moment.utc('6-Mar-2009', 'DD-MMM-YYYY')
    
  },
  {
    rate: 0.02,
    periodEnd: moment.utc('5-Mar-2009', 'DD-MMM-YYYY'),
    periodStart: moment.utc('6-Feb-2009', 'DD-MMM-YYYY')
    
  },
  {
    rate: 0.025,
    periodEnd: moment.utc('5-Feb-2009', 'DD-MMM-YYYY'),
    periodStart: moment.utc('9-Jan-2009', 'DD-MMM-YYYY')
    
  },
  {
    rate: 0.030,
    periodEnd: moment.utc('8-Jan-2009', 'DD-MMM-YYYY'),
    periodStart: moment.utc('5-Dec-2008', 'DD-MMM-YYYY')
  },
  {
    rate: 0.038,
    periodEnd: moment.utc('4-Dec-2008', 'DD-MMM-YYYY'),
    periodStart: moment.utc('1-Sep-2008', 'DD-MMM-YYYY')
  },
  {
    rate: 0.048,
    periodEnd: moment.utc('31-Aug-2008', 'DD-MMM-YYYY'),
    periodStart: moment.utc('1-Sep-2007', 'DD-MMM-YYYY')
  },
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

module.exports.calculateInterestForMonth = function(date, sum) {

  var days = dateUtils.getMonthDays(date);
  var getPeriodInterestCurry = R.curry(periodSelector.selectPeriod);
  var getPeriodInterest = getPeriodInterestCurry(interestRates);

  var periodInterests = R.map(function(day) {
    var period = getPeriodInterest(day);
    var dayInterest = period.rate * sum / 365;
    return dayInterest;
  }, days);

  var periodInterest = R.sum(periodInterests);

  return math.round(periodInterest, 2);
};
