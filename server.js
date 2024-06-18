var express = require('express')
var app = express()

var server = app.listen(process.env.PORT || 8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log(`Express app listening at http://localhost:${port}/"`)
})



if (process.env.NODE_ENV === 'production') {
    app.use(function(req, res, next) {
        if (req.get('x-forwarded-proto') !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        next();
    });
}


app.use(express.static('.'));
const homeRoute = require('./route/homeRoute');

app.use('/', homeRoute);


module.exports = app;
