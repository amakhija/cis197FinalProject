var mongo = require('./mongo');

var addUser = function (un, pw, callback) {
	var user = new mongo.User({
		username: un,
		password: pw
	});
	user.save();
};

var containsUser = function (un, pw, callback) {
	console.log('Checking if database contains user: ', un);
	mongo.User.find({username: un, password: pw}, function (error, result) {
		if (error) {
			callback(error);
		} else {
			callback(null, result.length > 0);
		}
	});
};

module.exports = {
	add_user: addUser,
	containsUser: containsUser
};