var express = require('express');
var app = express();
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');

// Serve static pages (not sure what this actually does tbh)
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// Generate a random cookie secret for this app
var generateCookieSecret = function () {
	return 'iamasecret' + uuid.v4();
};
app.use(cookieSession({
	secret: generateCookieSecret()
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function (req, res) {
	res.render('login', {message: null});
});
app.post('/checkLogin', routes.post_login);
app.get('/userHome', routes.get_userHome);
app.get('/adminHome', routes.get_adminHome);
app.get('/logout', routes.get_logout);
app.get('/newConflict', routes.get_newConflict);
app.post('/addNewConflict', routes.post_addNewConflict);
app.get('/viewConflicts', function(req, res) {res.send('conflicts')});
app.get('/createSchedule', function(req, res) {res.send('sched')});
app.post('/getCalendar', routes.get_getCalendar);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
console.log('Express server listening on port %d', server.address().port);
});

// apikey: AIzaSyBQYDV0Plv2ZCh-QYwCsBdGrccL2lWkPn4
