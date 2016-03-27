var Articles = require('../models/article').Articles,
	config = require('../config');

exports.post = function (req, res) {
	var id = req.params.id;

	Articles.remove(id, function (err) {
		if (err) throw err;

		res.send('deleted');
	});
};