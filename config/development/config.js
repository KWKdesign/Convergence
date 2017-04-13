var config = {};

config.port = 3333;
// config.socket = process.cwd() + '/convergence.sock';
console.log( config.socket );

config.express = {
	'case sensitive routing': false,
	'view engine': 'html',
	'views': 'lib/view',
};

config.db = {
	'adapter': 'postgres',
	'hostname': '127.0.0.1',
	'username': 'convergence',
	'password': 'tRgYeb$NKAWM!cJj',
	'database': 'convergence_dev',
};

module.exports = config;
