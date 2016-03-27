var mongoose = require('mongoose'),
	config = require('../config');

//provide a sensible default for local development
var db_name = 'blog';
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/blog';


// if (app.get('env') == 'production')  {
// 	mongodb_connection_string = 'mongodb://' + config.get('mongo:user') + ':' config.get('mongo:password')+ '@' + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + db_name;
// }

//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string);

module.exports = mongoose; 
