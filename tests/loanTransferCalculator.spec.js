/* jshint expr:true */
'use strict';

var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
chai.should();

var loanTransferCalculator = require('../routes/loanCalculator/loanTransferCalculator');

describe('Loan transfer calculator', function() {
  it('should exist', function() {
    loanTransferCalculator.should.exist;
  });

  var tests = [
    {
      year: 2008,
      expectedPayment: 1572.50,
      firstPayment: '3-Feb-2009',
      secondPayment: '3-Jun-2009'
    },
    {
      year: 2009,
      expectedPayment: 1612.50,
      firstPayment: '3-Feb-2010',
      secondPayment: '3-Jun-2010'
    },
    {
      year: 2011,
      expectedPayment: 1687.50,
      firstPayment: '3-Feb-2012',
      secondPayment: '3-Jun-2012'
    }
  ];

  function paymentTest(test) {

    describe('get payments for ' + test.year, function() {
      var loanTransfers;

      beforeEach(function() {
        loanTransfers = loanTransferCalculator.getLoanTransfer(test.year);
      });

      it('should have 2 payment periods', function() {
        
        loanTransfers.should.have.length(2);
      });

      describe('with first payment', function() {
        var firstPayment;

        beforeEach(function() {
          firstPayment = loanTransfers[0];
        });

        it('of 1572.50£', function() {
          expect(firstPayment.payment).to.equal(test.expectedPayment);
        });

        it('should be on ' + test.firstPayment, function() {
          expect(firstPayment.date.format('D-MMM-YYYY')).to.equal(test.firstPayment);
        });
      });    

      describe('with second payment', function() {
        var firstPayment;

        beforeEach(function() {
          firstPayment = loanTransfers[1];
        });

        it('of 1572.50£', function() {
          expect(firstPayment.payment).to.equal(test.expectedPayment);
        });

        it('should be on 6-Jun-2009', function() {
          expect(firstPayment.date.format('D-MMM-YYYY')).to.equal(test.secondPayment);
        });
      });
    });
  }

  tests.forEach(paymentTest);

  describe('getLoanTransferForMonth', function() {
    describe('with study year 2008 for Sep-2008', function() {
      it('should have 0£ payment', function() {
        var date = moment('Sep-2008', 'MMM-YYYY');
        var result = loanTransferCalculator.getLoanTransferForMonth([2008, 2009, 2010], date);
        expect(result).to.be.null;
      }); 
    });

    describe('with study year 2008 for Feb-2009', function() {
      it('should have 0£ payment', function() {
        var date = moment('Feb-2009', 'MMM-YYYY');
        var result = loanTransferCalculator.getLoanTransferForMonth([2008, 2009, 2010], date);
        expect(result.payment).to.equal(1572.5);
      }); 
    });

    describe('with study year 2008 for Mar-2009', function() {
      it('should have 0£ payment', function() {
        var date = moment('Mar-2009', 'MMM-YYYY');
        var result = loanTransferCalculator.getLoanTransferForMonth([2008, 2009, 2010], date);
        expect(result).to.be.null;
      }); 
    });

  });
});
