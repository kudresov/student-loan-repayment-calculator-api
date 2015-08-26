'use strict';

var R = require('ramda');
var moment = require('moment');
var math = require('mathjs');
var REPAYMENT_THRESHOLD = 17335;
var REPAYMENT_PERC = 0.09;
var MONTHS_IN_A_YEAR = 12;

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

var calculateMonthlyRepayment = function(salary){
  var yearlyDeductableAmout = salary - REPAYMENT_THRESHOLD;
  if (yearlyDeductableAmout <= 0) {
    return 0;
  }

  var monthlyDeduction = yearlyDeductableAmout * REPAYMENT_PERC / MONTHS_IN_A_YEAR;
  return monthlyDeduction;
};

// When HMRC expect to receive first payment from you
var getExpectedRepaymentDate = function(lastStudyYear){
  var firstRepaymentYear = lastStudyYear + 2;
  var result = moment({year: firstRepaymentYear, months: 3});
  return result;
};

var getFirstRepaymentDate = function(lastStudyYear, jobStartDate){
  var firstRepaymentDate;
  var expectedRepaymentDate = getExpectedRepaymentDate(lastStudyYear);

  if (expectedRepaymentDate.isAfter(jobStartDate)) {
    firstRepaymentDate = expectedRepaymentDate;
  }else {
    firstRepaymentDate = jobStartDate;
  }

  return firstRepaymentDate;
};

var calculateNumberOfMonthsRepayed = function(lastStudyYear, job){
  var jobStart = job.startDate;
  var jobStartDate = moment(jobStart);
  var jobEnd = job.endDate;
  var jobEndDate = moment(jobEnd);
  
  var firstRepaymentDate = getFirstRepaymentDate(lastStudyYear, jobStartDate);
  var jobDurationInMonths = jobEndDate.diff(firstRepaymentDate, 'months');

  return jobDurationInMonths;
};

var calculateRepaymentsRepaymentsForJob = function(lastStudyYear, job){
  var salary = job.basicSalary;

  var nrOfMonthsRepaid = calculateNumberOfMonthsRepayed(lastStudyYear, job);
  var monthlyRepayment = calculateMonthlyRepayment(salary);
  var totalRepayment = monthlyRepayment * nrOfMonthsRepaid;

  return math.round(totalRepayment, 2);
};

var getStudyYears = function(studyYears){
  var tuitionYearsFilter = function(studyYear){
    if (R.contains(studyYear.startYear, studyYears)) {
      return true;
    } else {
      return false;
    }
  };

  return R.filter(tuitionYearsFilter, tuitionFees);
};
  
module.exports.calculateRepayments = function(lastStudyYear, jobs){
  var repaymentCalc = R.curry(calculateRepaymentsRepaymentsForJob);
  var jobPayouts = R.map(repaymentCalc(lastStudyYear), jobs);
  var result = R.sum(jobPayouts);

  return {
    total: result
  };
};

module.exports.calculateTotalLoan = function(studyYears){
  var studyYearsData = getStudyYears(studyYears);
  var selectTuitionFee = function(tuitionYear) {
    return tuitionYear.fee;
  };

  var tuitionFees = studyYearsData.map(selectTuitionFee);
  var totalLoan = R.sum(tuitionFees);

  return totalLoan;
};