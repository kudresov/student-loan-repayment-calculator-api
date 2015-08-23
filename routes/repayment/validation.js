'use strict';

var util = require('util');

module.exports = function (req, res, next) {
  req.checkBody('studyYears', 'Invalid study years').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send('There have been validation errors: ' + util.inspect(errors));
    return;
  }

  next();
};