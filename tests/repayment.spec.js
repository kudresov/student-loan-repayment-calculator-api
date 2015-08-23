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

    describe('with 2008-2011 study years and 30k salary for 12 months starting on 1st of September', function(){
      it('should return final repayment on', function(done){
        var requestBody = {
            studyYears: [2008, 2009, 2010],
            jobs: [
                {
                    startDate: '2011-09-01T00:00:00.000Z',
                    basicSalary: 30000
                }
            ]
        };

        repaymentRequest()
          .send(requestBody)
          .end(function(err, res) {
            expect(res.status).to.equal(201);
            done();
          });

      });
    });
  });
});