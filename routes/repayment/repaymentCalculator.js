'use strict';

var _ = require('underscore');
var moment = require('moment');
var math = require('mathjs');
var REPAYMENT_THRESHOLD = 17335;
var REPAYMENT_PERC = 0.09;

var tuitionFees = [
  {
    startYear: 2005,
    fee: 1175
  },
  {
    startYear: 2006,
    fee: 3000
  },
  {
    startYear: 2007,
    fee: 3070
  },
  {
    startYear: 2008,
    fee: 3145
  },
  {
    startYear: 2009,
    fee: 3225
  },
  {
    startYear: 2010,
    fee: 3225 // TODO set correct one
  },
  {
    startYear: 2011,
    fee: 3375
  }
];

var interestRates = [
  {
    startYear: 2014,
    rate: 1.5
  },
  {
    startYear: 2013,
    rate: 1.5
  },
  {
    startYear: 2012,
    rate: 1.5
  },
  {
    startYear: 2011,
    rate: 1.5
  },
  {
    startYear: 2010,
    rate: 1.5
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

var calculateMonthlyRepayment = function(salary){
  var yearlyDeductableAmout = salary - REPAYMENT_THRESHOLD;
  var monthlyDeduction = yearlyDeductableAmout * REPAYMENT_PERC / 12;
  console.log(yearlyDeductableAmout * REPAYMENT_PERC);
  return monthlyDeduction;
};
  
module.exports.calculateRepayments = function(lastStudyYear, jobs){
  if (!jobs || jobs.length === 0) {
    return {
      total: 0
    };
  }

  var expectedRepaymentDate = moment({year: lastStudyYear + 2, months: 3});
  var jobStart = jobs[0].startDate;
  var jobStartDate = moment(jobStart);
  var salary = jobs[0].basicSalary;
  var firstRepaymentDate;

  if (expectedRepaymentDate.isAfter(jobStartDate)) {
    firstRepaymentDate = expectedRepaymentDate;
  }else {
    firstRepaymentDate = jobStartDate;
  }
  
  var jobEnd = jobs[0].endDate;
  var jobEndDate = moment(jobEnd);

  var jobDurationInMonths = jobEndDate.diff(firstRepaymentDate, 'months');
  var monthlyRepayment = calculateMonthlyRepayment(salary);
  var totalRepayment = monthlyRepayment * jobDurationInMonths;

  return {
    total: math.round(totalRepayment, 2)
  };
};

module.exports.calculateTotalLoan = function(studyYears){
  var tuitionYearsFilter = function(studyYear){
    if (_.contains(studyYears, studyYear.startYear)) {
      return true;
    }else {
      return false;
    }
  };

  var sum = function(memo, fee){
    return memo + fee;
  };

  var totalLoan = _.filter(tuitionFees, tuitionYearsFilter)
                         .map(function(tuitionYear){
                           return tuitionYear.fee;
                         })
                         .reduce(sum);

  return totalLoan;
};