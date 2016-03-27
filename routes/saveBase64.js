var fs = require('fs'),
	config = require('../config');

exports.post = function (req, res) {
	var base64Data = req.body.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
	// console.log(base64Data + '\n');
	// console.log('posted ' + req.body.name);

	var name = config.get('dir') + req.body.name;
	// console.log(name);

	fs.writeFile(name,  base64Data, 'base64', function(err) {
		if (err) throw err;
		res.end('ok');
	});

};