'use strict';

var repayment = require('./repayment');

module.exports = function(app) {
  app.post('/repayment', repayment.validation, repayment.route);
};