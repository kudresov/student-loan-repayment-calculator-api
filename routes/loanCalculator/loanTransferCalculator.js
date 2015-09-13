'use strict';

var moment = require('moment');
var tuitionFeeService = require('./tuitionFeeService');
var R = require('ramda');

function selectTransferMonth(transfers, month) {
  if (!transfers) {
    return null;
  }

  var result = R.find(function(transfer) {
    return transfer.date.isSame(month, 'month');
  })(transfers);

  return result;
}

function getLoanTransfer(studyYear) {
  var tutionYear = tuitionFeeService.getStudyYear(studyYear);
  var halfYearPayment = tutionYear.fee / 2;

  var firstPaymentDate = moment.utc({year: studyYear + 1, month: 1, day: 3});
  var secondPaymentDate = moment.utc({year: studyYear + 1, month: 5, day: 3});

  return [{
    payment: halfYearPayment,
    date: firstPaymentDate
  }, 
  {
    payment: halfYearPayment,
    date: secondPaymentDate
  }];
}

module.exports.getLoanTransfer = getLoanTransfer;

module.exports.getLoanTransferForMonth = function(studyYears, month) {
  var transfers = R.flatten(R.map(getLoanTransfer, studyYears));
  var payment = selectTransferMonth(transfers, month);
  var defaultPayment = R.defaultTo({payment: 0});
  
  return defaultPayment(payment);
};