'use strict';

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var server = require('../server');
chai.should();

describe('/repayment', function(){
  var repaymentRequest = function(){
    return request(server.app)
             .post('/repayment')
             .set('Accept', 'application/json');
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
        repaymentRequest()
          .send({})
          .expect(400, done);
      });
    });

    describe('with study years 2008,2009,2010', function(){

      it('should have a total loan of 9745£', function(done){
          var requestBody = {
              studyYears: [2008, 2009, 2010]
          };

        repaymentRequest()
          .send(requestBody)            
          .end(function(err, res) {
            expect(res.status).to.equal(201);
            expect(res.body.totalLoan).to.equal(9595);
            done();
          });
      });

      describe('with 2008-2011 study years and 30k salary for 12 months starting on 1st of September 2011', function(){
        it('should have repayed 569.93£', function(done){
          var requestBody = {
              studyYears: [2008, 2009, 2010],
              jobs: [
                  {
                      startDate: '2011-09-01T00:00:00.000Z',
                      endDate: '2012-09-01T00:00:00.000Z',
                      basicSalary: 30000
                  }
              ]
          };

          repaymentRequest()
            .send(requestBody)
            .end(function(err, res) {
              expect(res.status).to.equal(201);
              expect(res.body.totalRepaid).to.equal(569.93);
              done();
            });

        });
      });

      describe('with 2008-2011 study years and 30k salary for 24 months starting on 1st of September 2011', function(){
        xit('should have repayed 1709.78£', function(done){
          var requestBody = {
              studyYears: [2008, 2009, 2010],
              jobs: [
                  {
                      startDate: '2011-09-01T00:00:00.000Z',
                      endDate: '2013-09-01T00:00:00.000Z',
                      basicSalary: 30000
                  }
              ]
          };

          repaymentRequest()
            .send(requestBody)
            .end(function(err, res) {
              expect(res.status).to.equal(201);
              expect(res.body.totalRepaid).to.equal(1709.78);
              done();
            });

        });
      });
      
    });
  });
});