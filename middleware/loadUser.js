var User = require('../models/user').User;

module.exports = function (req, res, next) {
	res.locals.user = null;

	if (!req.session.user) return next();

	res.locals.admin = req.session.role;

	User.findById(req.session.user, function (err, user) {
		if (err) return next(err);

		req.user = res.locals.user = user;
		next();
	});
};