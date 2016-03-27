var HttpError = require('../error').HttpError;

module.exports = function requireRole(role) {
	return function(req, res, next) {

		if(req.session.user && req.session.role === role)
			next();
		else {
			return next(new HttpError(401, 'Ви не авторизовані'));
		}
	}
};