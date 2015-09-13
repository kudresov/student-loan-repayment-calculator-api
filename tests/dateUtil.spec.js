/* jshint expr:true */
'use strict';

var chai = require('chai');
var moment = require('moment');
chai.should();
var expect = chai.expect;

var dateUtils = require('../routes/loanCalculator/dateUtils');

describe('Month Utils', function() {
  it('should exist', function() {
    dateUtils.should.exist;
  });
 
  describe('get month days', function() {
    describe('Jan-2011', function() {
      var days;

      beforeEach(function() {
        days = dateUtils.getMonthDays(moment.utc('Jan-2011', 'MMM-YYYY'));
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
        var result = dateUtils.getMonthDays(moment.utc('Jan-2011', 'MMM-YYYY'));
        var firstDay = result[0];
        firstDay.date().should.equal(1);

        var day14 = result[13];
        day14.date().should.equal(14);

        var day31 = result[30];
        day31.date().should.equal(31);
      });
    }); 
  });

  describe('get half a month days', function() {
    describe('15-Feb-2011', function() {
      var days;

      beforeEach(function() {
        days = dateUtils.getMonthDays(moment.utc('15-Feb-2011', 'DD-MMM-YYYY'));
      });

      it('should have 14 days', function() {
        days.should.have.length(14);
      });

      it('should have first day as 15th', function() {
        var day1 = days[0];
        day1.date().should.equal(15);
      });

      it('should have last day as 28th', function() {
        var day14 = days[13];
        day14.date().should.equal(28);      
      });
    });
  });

  describe('get months in a period', function(){
    describe('between Aug-2009 and Sep-2009', function(){
      it('should be 2 months', function(){
        var startDate = moment.utc('Aug-2009', 'MMM-YYYY');
        var endDate = moment.utc('Sep-2009', 'MMM-YYYY');
        var result = dateUtils.getMonthsBetween(startDate, endDate);
        expect(result.length).to.equal(2);
      });      
    });

    describe('between Aug-2009 and Nov-2009', function(){
      it('should be 4 month2', function(){
        var startDate = moment.utc('Aug-2009', 'MMM-YYYY');
        var endDate = moment.utc('Nov-2009', 'MMM-YYYY');
        var result = dateUtils.getMonthsBetween(startDate, endDate);
        expect(result.length).to.equal(4);
      });      
    });

    describe('between Aug-2009 and Aug-2010', function(){
      it('should be 12 months', function(){
        var startDate = moment.utc('Aug-2009', 'MMM-YYYY');
        var endDate = moment.utc('Aug-2010', 'MMM-YYYY');
        var result = dateUtils.getMonthsBetween(startDate, endDate);
        expect(result.length).to.equal(13);
      });
    });

    describe('between Sep-2009 and Sep-2009', function(){
      it('should be 1 month', function(){
        var startDate = moment.utc('Sep-2009', 'MMM-YYYY');
        var endDate = moment.utc('Sep-2009', 'MMM-YYYY');
        var result = dateUtils.getMonthsBetween(startDate, endDate);
        expect(result.length).to.equal(1);
      });
    });

    describe('between Sep-2009 and Aug-2010', function(){
      it('should be 12 months', function(){
        var startDate = moment.utc('Sep-2009', 'MMM-YYYY');
        var endDate = moment.utc('Aug-2010', 'MMM-YYYY');
        var result = dateUtils.getMonthsBetween(startDate, endDate);
        expect(result.length).to.equal(12);
      });

      it('should have second month as Oct-2008', function(){
         var startDate = moment.utc('Sep-2009', 'MMM-YYYY');
          var endDate = moment.utc('Aug-2010', 'MMM-YYYY');
          var result = dateUtils.getMonthsBetween(startDate, endDate);
          expect(result[1].month()).to.equal(9);       
      });
    });
  });
});
