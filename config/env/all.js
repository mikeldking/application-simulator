'use strict';
module.exports = {
    name: 'Application Simulator',
    /**
     * The port to run the server
     */
    port: 3000,
    /**
     * The max number of octets that the data GET will return
     */
    maxDataOctets: 10485760,//10MB
    /**
     * The maximum delay that the application should simulate in ms
     */
    maxDelayMs: 2 * 60 * 1000//2 minutes
};