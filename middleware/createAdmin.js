var	User = require('../models/user').User;

module.exports = function (req, res, next) {
		var admin = new User({username: 'admin', password: 'admin'});
		admin.save(function (err, admin) {
			if (err) throw err;

			req.session.user = admin._id;
			req.session.role = 'admin';
		});
		console.log('ok');
		next();
	};