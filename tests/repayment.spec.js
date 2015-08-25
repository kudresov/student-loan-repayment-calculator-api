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

      it('should have a total loan of 9745£', function(done){
        repaymentRequest(requestBody)
          .end(function(err, res) {
            expect(res.status).to.equal(201);
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
                expect(res.status).to.equal(201);
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
                expect(res.status).to.equal(201);
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
                expect(res.status).to.equal(201);
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
                expect(res.status).to.equal(201);
                expect(res.body.totalRepaid).to.equal(0);
                done();
              });  
          });
        });
      });

    });
  });
});