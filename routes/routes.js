var userDB = require ('../db/user');
var conflictsDB = require('../db/conflict');

var postLogin = function(req, res){
	userDB.containsUser(req.body.username, req.body.password, function (error, result) {
		if (error) {
			res.send("Error found: "+error);
			console.log(error);
		}
		else if (req.body.username === "whosehaustho" && req.body.password === "drinkthatdrink") {
			req.session.isAdmin = true;
			req.session.isLoggedIn = true;
			req.session.username = "director";
			res.redirect('/adminHome');
		}
		else if (!result){
			res.render('login', {message: 'Incorrect username or password. Try again.'});
		}
		else {
			req.session.isAdmin = false;
			req.session.isLoggedIn = true;
			req.session.username = req.body.username;
			res.redirect('/userHome');
		}
	});
};

var userHomePage = function(req, res){
	if (!req.session.isLoggedIn) {
		res.redirect('/');
	}
	else {
		res.render('userHome.html');
	}
};

var adminHomePage = function (req, res) {
	if (!req.session.isLoggedIn || !req.session.isAdmin) {
		res.redirect('/');
	}
	else {
		res.render('adminHome.html');
	}

};

var logout = function (req, res) {
	req.session.isLoggedIn = false;
	if (req.isAdmin)
		req.isAdmin = false;
	res.redirect('/');
};

var newConflictPage = function (req, res) {
	if (!req.session.isLoggedIn)
		res.redirect('/');
	else
		res.render('newConflict.html', {message: req.session.conflictMessage ? req.session.conflictMessage : null});
};

var addNewConflict = function (req, res) {
	var un = req.session.username;

	var start = req.body.starttime;
	var end = req.body.endtime;

	// checks to make sure input is in the correct format
	var re = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
	if (!re.test(start) || !re.test(end)) {
		req.session.conflictMessage = "Times should be in format HH:MM or H:MM. Try again."
		res.redirect('/newConflict');
	}
	else {
		req.session.conflictMessage = null;
		var reason = req.body.reason;
		var legitimate = false;
		if (req.body.legitimacy)
			legitimate = true;

		conflictsDB.addConflict(un, start, end, reason, legitimate, function () {
			if (req.body.submit === "Submit & Go Home")
				res.redirect('/userHome');
			else
				res.redirect('/newConflict');
		})
	}
};

var postCalendar = function (req, res) {
	console.log("Inside the redirect");
	res.send("OK");
};

var routes = {
	post_login: postLogin,
	get_userHome: userHomePage,
	get_adminHome: adminHomePage,
	get_logout: logout,
	get_newConflict: newConflictPage,
	post_addNewConflict: addNewConflict,
	get_getCalendar: postCalendar
};

module.exports = routes;