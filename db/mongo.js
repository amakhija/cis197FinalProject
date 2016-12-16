var mongoose = require('mongoose');
mongoose.connect('mongodb://amakhija:pw@ds133428.mlab.com:33428/scheduling_database', function (err) {
	if (err && err.message.includes('ECONNREFUSED')) {
		console.log('Error connecting to mongodb database: %s.', err.message);
		process.exit(0);
	} else if (err) {
		throw err;
	} else {
		console.log('DB successfully connected.');
	}
});

var conn = mongoose.connection;

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

var conflictSchema = new mongoose.Schema({
	user: String,
	startTime: String,
	endTime: String,
	reason: String,
	legitimate: Boolean
});

var User = mongoose.model('users', userSchema);
var Conflict = mongoose.model('schedule', conflictSchema);

module.exports = {
	User: User,
	Conflict: Conflict,
	mongoose: mongoose,
	dbUser: conn.collection('User'),
	dbSchedule: conn.collection('Schedule')
};