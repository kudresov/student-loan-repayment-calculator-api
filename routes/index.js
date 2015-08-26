'use strict';

var loanCalculator = require('./loanCalculator');

module.exports = function(app) {
  app.post('/repayment', loanCalculator.validation, loanCalculator.route);
};