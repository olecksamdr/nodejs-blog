var Articles = require('../models/article').Articles,
	mongo = require('mongodb');

exports.get = function(req, res) {
	var oId = new mongo.ObjectID(req.params.id);

	Articles.findById(oId, function(err, data) {
		if (err) throw err;

		res.render('showPage.jade',
			{
				data:data
			});
	});
}