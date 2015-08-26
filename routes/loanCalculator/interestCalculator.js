'use strict';
var R = require('Ramda');

var MONTHS_IN_FIRST_YEAR = 7;

var interestRates = [
  {
    year: 2014,
    rate: 0.015
  },
  {
    year: 2013,
    rate: 0.015
  },
  {
    year: 2012,
    rate: 0.015
  },
  {
    year: 2011,
    rate: 0.015
  },
  {
    year: 2010,
    rate: 0
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

var getInterestRateForYear = function(year){
  return R.find(R.propEq('year', year))(interestRates).rate;
};

module.exports.calculateInterestForYear = function(year, sum){
  var rate = getInterestRateForYear(year);
  return rate * sum;
};

module.exports.calculateInterestForFirstYear = function(year, sum){
  var rate = getInterestRateForYear(year);
  var monthlyInterest = (rate * sum) / 12;
  return monthlyInterest * MONTHS_IN_FIRST_YEAR;
};