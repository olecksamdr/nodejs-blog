var Articles = require('../models/article').Articles;

exports.get = function (req, res) {
	var id = req.params.id;
	Articles.findById(id, function (err, doc) {
		if (err) throw err;

		res.render('editArticle', {
			title: 'edit',
			article: doc
		});
	});
};

exports.update = function (req, res) {
	var id = req.body.id;

	var article = {
		title: req.body.title,
		body: req.body.body,
		desc: req.body.desc,
		banner: req.body.banner
	};

	Articles.update({_id: id}, article, function (err) {
		if (err) throw err;

		res.send('updated');
	});
}