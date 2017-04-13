module.exports = function( app ) {

	app.get('/', function( req, res ) {
		var data = { 'test': true };
		res.render('home', data);
	});
	
	return this;
	
};