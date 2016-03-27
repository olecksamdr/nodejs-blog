var Articles = require('../models/article').Articles;

exports.post =  function (req, res) {
	var article = new Articles({
		title: req.body.title,
		body: req.body.body,
		desc: req.body.desc,
		banner: req.body.banner
	});

	article.save(function (err) {
		if (err) throw err;

		res.send('ok');
	})
};