var appPath = process.cwd(),
    config = require(appPath + '/config/config'),
    _ = require('lodash');

// Generate a random delay (up to config.maxDelayMs).
var randomDelay = function() {
    return Math.floor(Math.random() * config.maxDelayMs);
};

// Ensure delay is a number and between 0 and config.maxDelayMs.
var enforceDelayBounds = function(delayMs) {
    if(isNaN(delayMs)) {
        return randomDelay();
    }
    else if(delayMs > config.maxDelayMs) {
        return config.maxDelayMs;
    }
    else if (delayMs < 0) {
        return 0;
    }

    return delayMs;
};

module.exports = function(app){
    app.get('/delay', function(req, res) {
        // Get the delay parameter
        var delayMs = enforceDelayBounds(req.query.delay ? req.query.delay : 0);

        // Respond after the specified delay.
        setTimeout(function() {
            res.render('delay', {
                title: config.name,
                message: ('Delayed ' + Math.floor(delayMs/1000) + ' Second(s)')
            });
        }, delayMs);
    });
};