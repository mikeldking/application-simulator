'use strict';
var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    http = require('http'),
    appPath = process.cwd(),
    config = require(appPath + '/config/config'),
    util = require(appPath + '/util/util');

module.exports = function(app){
    // view engine setup
    app.set('views', path.join(path.join(appPath, 'views')));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(appPath, 'public')));

    util.walk(appPath + '/routes', 'middlewares', function(path) {
        require(path)(app);
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    // start the server up
    app.listen(config.port, function() {
        console.log(config.name +' listening on port ' + config.port + ' in ' + process.env.NODE_ENV + ' mode');
    });
};