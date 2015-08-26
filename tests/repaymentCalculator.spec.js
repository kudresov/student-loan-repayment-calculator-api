'use strict';

var chai = require('chai');
chai.should();

var repaymentCalculator = require('../routes/loanCalculator/repaymentCalculator');

describe('with study years 2008, 2009, 2010', function(){
  var lastStudyYear = 2010;

  describe('and 30k salary', function(){
    var salary = 30000;

    describe('for 12 months starting on 1st of September 2011', function(){
      it('should have repayed 474.94£', function(){
        var jobs = [{
                      startDate: '2011-09-01T00:00:00.000Z',
                      endDate: '2012-09-01T00:00:00.000Z',
                      basicSalary: salary
                    }];

        var result = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
        result.total.should.equal(474.94);
      });
    });

    describe('for 1 month starting 1st of april', function(){
      it('should have repayed 94.99£', function(){
         var jobs = [{
                      startDate: '2012-04-01T00:00:00.000Z',
                      endDate: '2012-05-01T00:00:00.000Z',
                      basicSalary: salary
                    }];  

        var result = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
        result.total.should.equal(94.99);
      });
    });

    describe('for 24 months starting on 1st of September 2011', function(){
      it('should have repayed 1614.79£', function(){
        var jobs = [{
                      startDate: '2011-09-01T00:00:00.000Z',
                      endDate: '2013-09-01T00:00:00.000Z',
                      basicSalary: salary
                    }];


        var result = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
        result.total.should.equal(1614.79);
      });
    }); 
  });

  describe('and 15k salary', function(){
    var salary = 15000;

    describe('for 12 months starting on 1st of September 20011', function(){
      it('should have repayed 0£', function(){
        var jobs = [{
                      startDate: '2011-09-01T00:00:00.000Z',
                      endDate: '2012-09-01T00:00:00.000Z',
                      basicSalary: salary
                    }];

        var result = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
        result.total.should.equal(0);
      });
    });
  });

  describe('and 17335 salary', function(){
    var salary = 17335;

    describe('for 12 months starting on 1st of September 20011', function(){
      it('should have repayed 0£', function(){
        var jobs = [{
                      startDate: '2011-09-01T00:00:00.000Z',
                      endDate: '2012-09-01T00:00:00.000Z',
                      basicSalary: salary
                    }];

        var result = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
        result.total.should.equal(0);
      });
    });
  });

  describe('with multiple jobs', function(){
    describe('with 30k salary for 12 months starting on 1st of September 2011', function(){
      var job1, job2;

      beforeEach(function(){
        job1 = {
                  startDate: '2011-09-01T00:00:00.000Z',
                  endDate: '2012-09-01T00:00:00.000Z',
                  basicSalary: 30000
                };
      });

      describe('and 40k salary for 6 months starting on 1st of October 2012', function(){
        beforeEach(function(){
          job2 = {
                    startDate: '2012-10-01T00:00:00.000Z',
                    endDate: '2013-04-01T00:00:00.000Z',
                    basicSalary: 40000
                  };
        });

        it('should have repayed 2514.81£', function(){
          var jobs = [job1, job2];
          var result = repaymentCalculator.calculateRepayments(lastStudyYear, jobs);
          result.total.should.equal(1494.87);
        });
      });
    });
  });
});
