var mongo = require('./mongo');

var addConflict = function (un, start, end, reason, legitimacy, callback) {
	console.log('Adding conflict '+reason+' from '+un);
	var conflict = new mongo.Conflict({
		user: un,
		startTime: start,
		endTime: end,
		reason: reason,
		legitimate: legitimacy 
	});
	conflict.save();
	callback();
};

module.exports = {
	addConflict: addConflict
};