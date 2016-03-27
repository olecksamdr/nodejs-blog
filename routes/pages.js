var Articles = require('../models/article').Articles;

exports.get = function(req, res) {
	Articles.pagesNeeded(function (err, pages) {
		if (err) throw err;
		var currentPage = req.params.num;

		Articles.findPerPage(currentPage, function(err, docs){
			if (err) throw err;

			// console.log(count);
			res.render('index', {
				title: 'psyho blog',
				pages: pages,
				imgPath: '../../',
				articles: docs
			});
		});
	});
}