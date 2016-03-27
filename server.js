'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	mongo = require('mongodb'),
	utils = require('util'), // can be deleted
	config = require('./config'),
	mongoose = require('./libs/mongoose'),
	User = require('./models/user').User,
	HttpError = require('./error').HttpError,
	log = require('./libs/log')(module);
var app = express();

// configurations
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());

// sessins
var MongoStore = require('connect-mongo/es5')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    resave: false,
    saveUninitialized: true,
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// directory for saving files
var dir = process.env.OPENSHIFT_DATA_DIR || __dirname + '/public/img/loaded/';
app.use('/loaded', express.static(dir));

config.set('dir', dir);

// app.use(require('./middleware/createAdmin.js'));
app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));
// всі роути
require('./routes')(app);

// обєкт що відповідає за статті
var Articles = require('./models/article').Articles;

// буде виводитися 6 статей на одній сторінці
Articles.articlePerPage = 6;

app.use(function(err, req, res, next) {
	if (typeof err == 'number') {
		err = new HttpError(err);
	}

	if (err instanceof HttpError) {
		res.sendHttpError(err);
	} else {
		log.error(err);
		err = new HttpError(500);
		res.sendHttpError(err);
	}
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, function () {
	console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});