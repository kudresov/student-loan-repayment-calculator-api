'use strict';

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var server = require('../server');
var testData = require('./expectedResponse.json');
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
          studyYears: [2008, 2009, 2010],
          jobs: [
              {
                  startDate: '2012-04-01T00:00:00.000Z',
                  endDate: '2013-04-01T00:00:00.000Z',
                  basicSalary: 60000
              },
              {
                  startDate: '2013-05-01T00:00:00.000Z',
                  endDate: '2015-04-01T00:00:00.000Z',
                  basicSalary: 120000
              }
          ]
        };
      });

      it('should return status 201', function(done){
        repaymentRequest(requestBody)
          .end(function(err, res) {
            expect(res.status).to.equal(201);
            res.body.totalLoan.should.equal(9595);
            console.log(res.details);
            done();
          });        
      });

      it('should have a correct first month', function(done){
        repaymentRequest(requestBody)
          .end(function(err, res) {
            var sep = res.body.details[0].month;
            expect(sep).to.equal('2008-09-01T00:00:00.000Z');
            done();
          });  
      });

      it.skip('should have correct data', function(done){
        repaymentRequest(requestBody)
          .end(function(err, res) {
            expect(res.body).to.deep.equal(testData);
            done();
          });   
      });
    });
  });
});