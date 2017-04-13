// admin controller
module.exports = function ( app ) {

	app.get( '/admin', function( req, res ) {
		// var User = app.model.user;
		// User.create(
			// {
				// username: 'test2',
			// },
			// function (err,model) {
				// console.log(err);
			// }
		// );
		// var users;
		app.model.User.all( function( err, users ){
			if ( err ) {
				console.log( err );
			}
			else {
				res.render( 'admin', {
					test: true,
					msg: 'msg is no shorter!',
					users: users,
					users_json: JSON.stringify( users ),
				});
			}
		});
	});

	return this;
};