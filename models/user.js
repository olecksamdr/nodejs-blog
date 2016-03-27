var crypto = require('crypto'),
	mongoose = require('../libs/mongoose'),
	util = require('util'),
	async = require('async');

	Schema = mongoose.Schema;

var schema = new Schema({
	username: {
		type: String,
		unique: true,
		reqired: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	role: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

	schema.methods.encryptPassword = function (password) {
		return crypto.createHmac('sha1', this.salt).update('password').digest('hex');
	};

	schema.virtual('password')
		.set(function (password) {
			this._plainPassword = password;
			this.salt = Math.random() + '';
			this.hashedPassword = this.encryptPassword(password);
		})
		.get(function () { return this._plainPassword; });

	schema.methods.checkPassword = function (password) {
		return this.encryptPassword(password) ===  this.hashedPassword;
	};

	schema.statics.login = function (username, password, callback) {
			var User = this;

			async.waterfall([
				function (callback) {
					User.findOne({username: username}, callback);
				},
				function (user, callback) {
					if (user) {
						if (user.checkPassword(password)) {
							callback(null, user);
						} else {
							callback(new AuthError('Не вірний параль'));
						}
					} else {
					callback(new AuthError('Не вірне і\'мя користувача'));
				}
			}],
			callback
		); 
	};

	schema.statics.signup = function (username, password, role, callback) {
		var User = this;

		User.findOne({username: username}, function (err, user) {
			if (err) return callback(err);
			if (user) {
				callback(new AuthError('Користувач з таким іменем вже існує'));
			} else {
				var user = new User({username: username, password: password, role: role});
				user.save(function (err) {
					if (err) return callback(err);
					return callback(null, user);
				});
			}
		});
	}

	exports.User = mongoose.model('User', schema);

	// класс пмилик реєстрації, чи авторизації
	function AuthError (message) {
		Error.apply(this, arguments);
		Error.captureStackTrace(this, AuthError);

		this.message = message;
	}

	util.inherits(AuthError, Error);

	AuthError.prototype.name = 'AuthError';

	exports.AuthError = AuthError;