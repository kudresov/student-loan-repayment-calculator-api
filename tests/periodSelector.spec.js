'use strict';

var chai = require('chai');
var moment = require('moment');
var should = chai.should();

var periodSelector = require('../routes/loanCalculator/periodSelector');

describe('Select Period', function(){
  
  describe('with no periods', function(){
    it('selects null', function(){
      var result = periodSelector.selectPeriod(moment('Jun-2011'));
      should.not.exist(result);
    });
  });

  describe('with empty array of periods', function(){
    it('selects null', function(){
      var result = periodSelector.selectPeriod(moment('Jun-2011', []));
      should.not.exist(result);
    });
  });

  describe('with 2011-2012 period', function(){
    var periods = [
      {
        period: 'period1',
        periodStart: moment('Jan-2011', 'MMM-YYYY'),
        periodEnd: moment('Dec-2011', 'MMM-YYYY')
      }
    ];

    describe('selecting Dec-2010', function(){
      it('should return null', function(){
        var result = periodSelector.selectPeriod(moment('Dec-2010', 'MMM-YYYY'), periods);
        should.not.exist(result);     
      });
    });

    describe('selecting Jan-2011', function(){
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Jan-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');
      });
    });

    describe('selecting Aug-2011', function(){
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Aug-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Dec-2011', function(){
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Dec-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Jan-2012', function(){
      it('should return null', function(){
        var result = periodSelector.selectPeriod(moment('Jan-2012', 'MMM-YYYY'), periods);
        should.not.exist(result);     
      });
    });
  });

  describe('with 2011-2012 and 2012-2013 periods', function(){
    var periods = [
      {
        period: 'period1',
        periodStart: moment('Jan-2011', 'MMM-YYYY'),
        periodEnd: moment('Dec-2011', 'MMM-YYYY')
      },
      {
        period: 'period2',
        periodStart: moment('Jan-2012', 'MMM-YYYY'),
        periodEnd: moment('Dec-2012', 'MMM-YYYY')
      }
    ];

    describe('selecting Dec-2010', function(){
      it('should return null', function(){
        var result = periodSelector.selectPeriod(moment('Dec-2010', 'MMM-YYYY'), periods);
        should.not.exist(result);     
      });
    });

    describe('selecting Jan-2011', function(){
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Jan-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');
      });
    });

    describe('selecting Aug-2011', function(){
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Aug-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Dec-2011', function(){
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Dec-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Jan-2012', function(){
      it('should return null', function(){
        var result = periodSelector.selectPeriod(moment('Jan-2012', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period2');  
      });
    });
  });

  describe('with Feb-2011 to Feb-2011 period', function(){
    var periods = [
      {
        period: 'period1',
        periodStart: moment('Jan-2011', 'MMM-YYYY'),
        periodEnd: moment('Dec-2011', 'MMM-YYYY')
      }
    ];

    describe('selecting Feb-2011', function(){
      
      it('should return period1', function(){
        var result = periodSelector.selectPeriod(moment('Feb-2011', 'MMM-YYYY'), periods);
        result.should.have.property('period', 'period1');     
      });
    });
  });
});
