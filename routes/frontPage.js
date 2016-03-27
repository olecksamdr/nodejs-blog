var Articles = require('../models/article').Articles;

exports.get = function (req, res) {
	Articles.pagesNeeded(function (err, pages) {
		if (err) throw err;

		Articles.findPerPage(1, function(err, docs){
			if (err) throw err;

			res.render('index', {
				title: 'psyho blog',
				pages: pages,
				imgPath: '',
				articles: docs
			});
		});
	});
};