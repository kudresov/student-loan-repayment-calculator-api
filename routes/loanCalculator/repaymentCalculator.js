'use strict';

var R = require('ramda');
var moment = require('moment');
var math = require('mathjs');
var REPAYMENT_THRESHOLD = 17335;
var REPAYMENT_PERC = 0.09;
var MONTHS_IN_A_YEAR = 12;

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

var isPaymentRequired = function(lastStudyYear, month) {
  var expectedRepaymentDate = getExpectedRepaymentDate(lastStudyYear);
  return month.isAfter(expectedRepaymentDate) || month.isSame(expectedRepaymentDate);
};

module.exports.calculateRepaymentForMonth = function(lastStudyYear, jobs, month){
  var needToRepayThisMonth = isPaymentRequired(lastStudyYear, month);
  if (!needToRepayThisMonth) {
    return 0;
  }

  var jobAtThisPeriod = R.find(function(job) {
    var jobStartDate = moment(job.startDate);
    var jobEndDate = moment(job.endDate);
    return month.isBetween(jobStartDate, jobEndDate) ||
           month.isSame(jobStartDate) || 
           month.isSame(jobEndDate);
  })(jobs);

  var repayment = calculateMonthlyRepayment(jobAtThisPeriod.basicSalary);

  return math.round(repayment, 2);
};
  
module.exports.calculateRepayments = function(lastStudyYear, jobs){
  var repaymentCalc = R.curry(calculateRepaymentsRepaymentsForJob);
  var jobPayouts = R.map(repaymentCalc(lastStudyYear), jobs);
  var result = R.sum(jobPayouts);

  return {
    total: result
  };
};