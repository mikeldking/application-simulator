var config = require('../config/config');
module.exports = function(app){
    app.get('/', function(req, res) {
        res.render('index', {
            title: config.name
        });
    });
};