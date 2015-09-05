'use strict';

var chai = require('chai');
var moment = require('moment');
chai.should();

var dateUtils = require('../routes/loanCalculator/dateUtils');

describe('Month Utils', function() {
  it('should exist', function() {
    dateUtils.should.exist;
  });
 
  describe('get month days', function() {
    describe('Jan-2011', function() {
      var days;

      beforeEach(function() {
        days = dateUtils.getMonthDays(moment('Jan-2011', 'MMM-YYYY'));
      });

      it('should have 31 day', function() {
        days.should.have.length(31);
      });

      it('should be all Jan', function() {
        days.forEach(function(day) {
          var month = day.get('month');
          month.should.equal(0);
        });
      });
      it('should give right months', function() {
        var result = dateUtils.getMonthDays(moment('Jan-2011', 'MMM-YYYY'));
        var firstDay = result[0];
        firstDay.date().should.equal(1);

        var day14 = result[13];
        day14.date().should.equal(14);

        var day31 = result[30];
        day31.date().should.equal(31);
      });
    }); 
  });
});
