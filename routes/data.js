'use script';
var appPath = process.cwd(),
    config = require(appPath + '/config/config');
/**
 * Creates a buffer of the specified size with dummy data in it
 * @param octets
 * @returns {Buffer}
 */
function createBufferWithDummyData(octets){
    //dummy data to insert into the buffer
    var writeData = 'I will not do bad things';
    console.log('Creating a buffer (%d octets)...', octets);
    var buffer = new Buffer(octets);
    //fill the buffer with data
    for(var i = 0; i < octets/writeData.length; i++){
        buffer.write(writeData, i * writeData.length);
    }
    return buffer;
};

module.exports = function(app){
    app.post('/data', function(req, res) {
        res.send('Data Received');
    });
    app.get('/data', function(req, res) {
        var octets = (req.query.octets && parseInt(req.query.octets, 10) < config.maxDataOctets) ? parseInt(req.query.octets, 10) : config.maxDataOctets;
        var buffer = createBufferWithDummyData(octets);

        res.send(buffer);
    });
};