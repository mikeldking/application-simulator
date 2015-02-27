'use strict';

var express = require('express'),
    appPath = process.cwd(),
    config = require('../config');

module.exports = function() {
    //initialize express and its routes.
    var app = express();
    require(appPath + '/config/express')(app);

    return app;
};