'use script';

module.exports = function(app){
    app.get('/download', function(req, res) {
        res.render('download', {
            title: 'Download'
        });
    });
};