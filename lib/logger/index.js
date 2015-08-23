'use strict';

var winston = require('winston');

var myCustomLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  colors: {
    debug: 'grey',
    info: 'white',
    warn: 'yellow',
    error: 'red'
  }
};

winston.addColors(myCustomLevels.colors);

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: 'true',
      levels: myCustomLevels.levels,
      prettyPrint: true,
      depth: 2
    })
  ]
});

module.exports = logger;
