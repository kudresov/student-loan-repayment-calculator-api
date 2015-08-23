'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var logger = require('./lib/logger');
var app = express();
var port = 3000;
var env = process.env.NODE_ENV || 'develop';
var server;

app.use(bodyParser.json());
app.use(expressValidator());
require('./routes')(app);

function start() {
  server = app.listen(port);
  logger.info('Express server listening on port %d in %s mode', port, env);
}

function stop(){
  server.close();
}

logger.info('App has been bootsrapped');

exports.start = start;

exports.stop = stop;
exports.app = app;