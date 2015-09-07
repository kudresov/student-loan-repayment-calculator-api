'use strict';

var R = require('Ramda');

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
  },
  {
    startYear: 2012, // TODO fix to correct
    fee: 3375
  }
];

module.exports.getStudyYears = function(studyYears) {
  var tuitionYearsFilter = function(studyYear) {
    if (R.contains(studyYear.startYear, studyYears)) {
      return true;
    } else {
      return false;
    }
  };

  return R.filter(tuitionYearsFilter, tuitionFees);
};

module.exports.getStudyYear = function(studyYear) {
  return R.find(R.propEq('startYear', studyYear))(tuitionFees);
};