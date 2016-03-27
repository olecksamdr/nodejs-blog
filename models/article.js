var mongoose = require('../libs/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	title:  String,
	banner: String,
	desc: String,
	body: String,
	hidden: Boolean,
	created_at: {
		type: Date,
		default: Date.now
	}
});

schema.statics.articlePerPage = 6;

schema.statics.pagesNeeded = function (cb) {
	var numItems = this.articlePerPage;
	this.count({}, function (err, count) {
		if (err) cb(err);

		var pages = Math.ceil(count / numItems);
		cb(null, pages);
	});
}

schema.statics.findPerPage = function (pageNumber, cb) {
	var numItems = this.articlePerPage;
	mongoose.connection.db.collection('articles', function (err, articles) {
		articles.find()
		.sort({created_at: -1})
		.skip(numItems * (pageNumber- 1))
		.limit(numItems)
		.toArray(function (err, articles) {
			if (err) cb(err);

			cb(null, articles)
		});
	});
}

schema.statics.remove = function (id, cb) {
	this.findById({_id: id}).remove(cb);
}


exports.Articles = mongoose.model('articles', schema);