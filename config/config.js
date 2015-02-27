'use strict';
var _ = require('lodash'),
    fs = require('fs');

// Extend the base configuration in all.js with environment specific configuration
var env = (process.env.NODE_ENV || 'development'),
    config = _.extend(
        require('./env/all'),
        require('./env/' + env) || {}
    );

console.log('Loaded Configuration: ', config);

module.exports = config;