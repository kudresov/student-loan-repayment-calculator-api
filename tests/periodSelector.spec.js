'use strict';

var chai = require('chai');
var moment = require('moment');
var should = chai.should();

var periodSelector = require('../routes/loanCalculator/periodSelector');

describe('Select Period', function() {
  
  describe('with no periods', function() {
    it('selects null', function() {
      var result = periodSelector.selectPeriod(null, moment.utc('Jun-2011', 'MMM-YYYY'));
      should.not.exist(result);
    });
  });

  describe('with empty array of periods', function() {
    it('selects null', function() {
      var result = periodSelector.selectPeriod(moment.utc([], 'Jun-2011', 'MMM-YYYY'));
      should.not.exist(result);
    });
  });

  describe('with 2011-2012 period', function() {
    var periods = [
      {
        period: 'period1',
        periodStart: moment.utc('Jan-2011', 'MMM-YYYY'),
        periodEnd: moment.utc('Dec-2011', 'MMM-YYYY')
      }
    ];

    describe('selecting Dec-2010', function() {
      it('should return null', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Dec-2010', 'MMM-YYYY'));
        should.not.exist(result);     
      });
    });

    describe('selecting Jan-2011', function() {
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Jan-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');
      });
    });

    describe('selecting Aug-2011', function() {
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Aug-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Dec-2011', function() {
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Dec-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Jan-2012', function() {
      it('should return null', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Jan-2012', 'MMM-YYYY'));
        should.not.exist(result);     
      });
    });
  });

  describe('with 2011-2012 and 2012-2013 periods', function() {
    var periods = [
      {
        period: 'period1',
        periodStart: moment.utc('Jan-2011', 'MMM-YYYY'),
        periodEnd: moment.utc('Dec-2011', 'MMM-YYYY')
      },
      {
        period: 'period2',
        periodStart: moment.utc('Jan-2012', 'MMM-YYYY'),
        periodEnd: moment.utc('Dec-2012', 'MMM-YYYY')
      }
    ];

    describe('selecting Dec-2010', function() {
      it('should return null', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Dec-2010', 'MMM-YYYY'));
        should.not.exist(result);     
      });
    });

    describe('selecting Jan-2011', function() {
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Jan-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');
      });
    });

    describe('selecting Aug-2011', function() {
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Aug-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Dec-2011', function() {
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Dec-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');      
      });
    });

    describe('selecting Jan-2012', function() {
      it('should return null', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Jan-2012', 'MMM-YYYY'));
        result.should.have.property('period', 'period2');  
      });
    });
  });

  describe('with Feb-2011 to Feb-2011 period', function() {
    var periods = [
      {
        period: 'period1',
        periodStart: moment.utc('Jan-2011', 'MMM-YYYY'),
        periodEnd: moment.utc('Dec-2011', 'MMM-YYYY')
      }
    ];

    describe('selecting Feb-2011', function() {
      
      it('should return period1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('Feb-2011', 'MMM-YYYY'));
        result.should.have.property('period', 'period1');     
      });
    });
  });

  describe('with 1-Feb-2011 to 15-Feb-2011 and 16-Feb-2011 to 28-Feb-2011', function() {
    var periods = [
      {
        period: 'period1',
        periodStart: moment.utc('1-Feb-2011', 'DD-MMM-YYYY'),
        periodEnd: moment.utc('15-Feb-2011', 'DD-MMM-YYYY')
      },
      {
        period: 'period2',
        periodStart: moment.utc('16-Feb-2011', 'DD-MMM-YYYY'),
        periodEnd: moment.utc('28-Feb-2011', 'DD-MMM-YYYY')
      }
    ];

    describe('selecting 1-Feb-2011', function() {
      it('should return period 1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('1-Feb-2011', 'DD-MMM-YYYY'));
        result.should.have.property('period', 'period1');     
      });
    });

    describe('selecting 5-Feb-2011', function() {
      it('should return period 1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('5-Feb-2011', 'DD-MMM-YYYY'));
        result.should.have.property('period', 'period1');     
      });
    });

    describe('selecting 15-Feb-2011', function() {
      it('should return period 1', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('15-Feb-2011', 'DD-MMM-YYYY'));
        result.should.have.property('period', 'period1');     
      });
    });

    describe('selecting 16-Feb-2011', function() {
      it('should return period 2', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('16-Feb-2011', 'DD-MMM-YYYY'));
        result.should.have.property('period', 'period2');     
      });
    });

    describe('selecting 20-Feb-2011', function() {
      it('should return period 2', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('20-Feb-2011', 'DD-MMM-YYYY'));
        result.should.have.property('period', 'period2');     
      });
    });

    describe('selecting 28-Feb-2011', function() {
      it('should return period 2', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('28-Feb-2011', 'DD-MMM-YYYY'));
        result.should.have.property('period', 'period2');  
      });
    });

    describe('selecting 1-Mar-2011', function() {
      it('should return period 2', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('1-Mar-2011', 'DD-MMM-YYYY'));
        should.not.exist(result);
      });
    });
  });

  describe('with 5-Dec-2008 to 8-Jan-2009 and 1-Sep-2008 to 4-Dec-2008', function() {
    var periods = [
      {
        period: 'period1',
        periodStart: moment.utc('5-Dec-2008', 'DD-MMM-YYYY'),
        periodEnd: moment.utc('8-Jan-2009', 'DD-MMM-YYYY')
      },
      {
        period: 'period2',
        periodStart: moment.utc('1-Sep-2008', 'DD-MMM-YYYY'),
        periodEnd: moment.utc('4-Dec-2008', 'DD-MMM-YYYY')
      }
    ];

    describe('slect 2008-12-06', function() {
      it('should return period 2008-12-06', function() {
        var result = periodSelector.selectPeriod(periods, moment.utc('6-Dec-2008', 'DD-MMM-YYYY'));

        result.should.have.property('period', 'period1');
      });
    });
  });
});
