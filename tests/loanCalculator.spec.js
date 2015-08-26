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
    });
  });
});