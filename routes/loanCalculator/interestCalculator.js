'use strict';

var moment = require('moment');
var math = require('mathjs');
var periodSelector = require('./periodSelector');

var interestRates = [
  {
    rate: 0.015,
    periodStart: moment('Sep-2010', 'MMM-YYYY'),
    periodEnd: moment('Sep-2090', 'MMM-YYYY')
  },
  {
    rate: 0,
    periodStart: moment('Sep-2009', 'MMM-YYYY'),
    periodEnd: moment('Aug-2010', 'MMM-YYYY')
  },
  {
    rate: 0.015,
    periodStart: moment('Mar-2009', 'MMM-YYYY'),
    periodEnd: moment('Aug-2009', 'MMM-YYYY')
  },
  {
    rate: 0.02,
    periodStart: moment('Feb-2009', 'MMM-YYYY'),
    periodEnd: moment('Feb-2009', 'MMM-YYYY')
  },
  {
    rate: 0.025,
    periodStart: moment('Jan-2009', 'MMM-YYYY'),
    periodEnd: moment('Jan-2009', 'MMM-YYYY')
  },
  {
    rate: 0.030,
    periodStart: moment('Dec-2008', 'MMM-YYYY'),
    periodEnd: moment('Dec-2008', 'MMM-YYYY')
  },
  {
    rate: 0.038,
    periodStart: moment('Sep-2008', 'MMM-YYYY'),
    periodEnd: moment('Nov-2008', 'MMM-YYYY')
  },
  // {
  //   rate: 0.048,
  //   periodStart: moment('Sep-2008', 'MMM-YYYY'),
  //   periodEnd: moment('Nov-2008', 'MMM-YYYY')
  // },
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

  var period = periodSelector.selectPeriod(date, interestRates);

  var result = period.rate * sum / 12;
  return math.round(result, 2);
};
