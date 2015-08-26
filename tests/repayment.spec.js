'use strict';

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var server = require('../server');
chai.should();

describe('/repayment', function(){
  var repaymentRequest = function(requestBody){
    return request(server.app)
             .post('/repayment')
             .set('Accept', 'application/json')
             .send(requestBody);
  };

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  describe('POST', function(){
    describe('with empty body', function(){
      it('should return a 400', function(done){
        repaymentRequest({})
          .expect(400, done);
      });
    });

    describe('with study years 2008, 2009, 2010', function(){
      var requestBody;

      beforeEach(function(){
        requestBody = {
          studyYears: [2008, 2009, 2010]
        };
      });

      it('should return status 201', function(done){
        repaymentRequest(requestBody)
          .end(function(err, res) {
            expect(res.status).to.equal(201);
            done();
          });        
      });

      it('should have a total loan of 9745£', function(done){
        repaymentRequest(requestBody)
          .end(function(err, res) {
            expect(res.body.totalLoan).to.equal(9595);
            done();
          });
      });

      describe('and 30k salary', function(){
        var salary = 30000;

        describe('for 12 months starting on 1st of September 2011', function(){
          it('should have repayed 474.94£', function(done){
            requestBody.jobs = [
                        {
                            startDate: '2011-09-01T00:00:00.000Z',
                            endDate: '2012-09-01T00:00:00.000Z',
                            basicSalary: salary
                        }];

            repaymentRequest(requestBody)
              .end(function(err, res) {
                expect(res.body.totalRepaid).to.equal(474.94);
                done();
              });
          });
        });

        describe('for 1 month starting 1st of april', function(){
          it('should have repayed 94.99£', function(done){
             requestBody.jobs = [
                    {
                        startDate: '2012-04-01T00:00:00.000Z',
                        endDate: '2012-05-01T00:00:00.000Z',
                        basicSalary: salary
                    }];  

            repaymentRequest(requestBody)
              .end(function(err, res) {
                expect(res.body.totalRepaid).to.equal(94.99);
                done();
              });
          });
        });

        describe('for 24 months starting on 1st of September 2011', function(){
          it('should have repayed 1614.79£', function(done){
            requestBody.jobs = [
                    {
                        startDate: '2011-09-01T00:00:00.000Z',
                        endDate: '2013-09-01T00:00:00.000Z',
                        basicSalary: salary
                    }];

            repaymentRequest(requestBody)
              .end(function(err, res) {
                expect(res.body.totalRepaid).to.equal(1614.79);
                done();
              });
          });
        }); 
      });

      describe('and 15k salary', function(){
        var salary = 15000;

        describe('for 12 months starting on 1st of September 20011', function(){
          it('should have repayed 0£', function(done){
            requestBody.jobs = [
                        {
                            startDate: '2011-09-01T00:00:00.000Z',
                            endDate: '2012-09-01T00:00:00.000Z',
                            basicSalary: salary
                        }];

            repaymentRequest(requestBody)
              .end(function(err, res) {
                expect(res.body.totalRepaid).to.equal(0);
                done();
              });  
          });
        });
      });

      describe('and 17335 salary', function(){
        var salary = 15000;

        describe('for 12 months starting on 1st of September 2011', function(){
          it('should have repayed 0£', function(done){
            requestBody.jobs = [
                        {
                            startDate: '2011-09-01T00:00:00.000Z',
                            endDate: '2012-09-01T00:00:00.000Z',
                            basicSalary: salary
                        }];

            repaymentRequest(requestBody)
              .end(function(err, res) {
                expect(res.body.totalRepaid).to.equal(0);
                done();
              });  
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

            it('should have repayed 2514.81£', function(done){
              requestBody.jobs = [job1, job2];

              repaymentRequest(requestBody)
                .end(function(err, res) {
                  expect(res.body.totalRepaid).to.equal(1494.87);
                  done();
                }); 
            });
          });
        });

      });
    });
  });
});