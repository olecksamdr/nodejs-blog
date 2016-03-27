var User = require('../models/user').User;
var AuthError = require('../models/user').AuthError;
var HttpError = require('../error').HttpError;

exports.post = function (req ,res, next) {
	var
		username = req.body.username,
		password = req.body.password;

	User.login(username, password, function (err, user) {
		if (err) {
			if (err instanceof AuthError)
				return next(new HttpError(403, err.message));
			else 
				return next(err);
		}
		req.session.user = user._id;
		req.session.role = user.role;
		res.send({});
	});
};