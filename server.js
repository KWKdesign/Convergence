var env = process.env.NODE_ENV || 'development',
	config = require('./config/' + env + '/config.js'),
	express = require('express'),
	session = require('express-session'),
	app = express(),
	consign = require('consign');

// configure express
for ( var i in config.express ) app.set( i, config.express[i] );

// configure body-parser
var bodyParser = require('body-parser');
app.jsonParser = bodyParser.json();
app.urlencodedParser = bodyParser.urlencoded({ extended: false });

// configure jugglingdb
var Schema = require('jugglingdb').Schema;
app.schema = new Schema( config.db.adapter, {
	database: config.db.database,
	username: config.db.username,
	host: config.db.host,
	password: config.db.password,
	ssl: true,
	debug: true,
});

// configure nunjucks
var nunjucks = require('nunjucks');
nunjucks.configure('lib/view', {
	autoescape: true,
	trimBlocks: true,
	lstripBlocks: true,
	watch: true,
	express: app,
});

// autoload lib
consign({
		cwd: 'lib',
		locale: 'en-us',
		logger: console,
		verbose: true,
		extensions: [ '.js', '.json', '.node' ],
		loggingType: 'info',
	})
	.include('model')
	.then('controller')
	.then('router.js')
	.into(app);

// serve static files
app.use( express.static( __dirname + '/static' ) );

// app.schema.automigrate(function(){});

// start the server
app.listen( config.socket || config.port, function(){} );

exports = module.exports = app;