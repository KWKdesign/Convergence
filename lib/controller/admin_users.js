// admin/users controller
module.exports = function ( app, require ) {

	app.get('/admin/users', function( req, res ) {
		app.model.User.all( function( err, users ){
			if ( err ) {
				console.log( err );
			}
			else {
				// console.log( data );
				res.render( 'admin/users', {
					test: true,
					msg: 'msg is no shorter!',
					users: users,
					users_json: JSON.stringify( users ),
				});
			}
		});
	});

	app.post('/crud/users/new', function( req, res ) {
		var params = req.body;
		app.model.User.create({
			username: '',
			firstname: '',
			lastname: '',
		});
	});


	app.get('/admin/users', function( req, res ) {
		app.model.User.all( function( err, users ){
			if ( err ) {
				console.log( err );
			}
			else {
				// console.log( data );
				res.render( 'admin/users', {
					test: true,
					msg: 'msg is no shorter!',
					users: users,
					users_json: JSON.stringify( users ),
				});
			}
		});
	});

	app.post( '/crud/admin/users/:id/edit',
		app.urlencodedParser,
		function ( req, res ) {
				console.log( req.body );
				app.model.User.findOne(
					{
						id: req.params.id
					},
					updateUser
				);

				function updateUser ( err, User ) {
					if ( err || User === null ) {
						res.status(400).json(
							{
								success: false,
								err: err || 'Not Found',
								status: 400,
							}
						);
					}
					else {
						// TODO validation
						// TODO versioned record
						// TODO changed fields only
						console.log( 'dump user' );
						for( var param in User ) {
							console.log( param );
						}
						User.firstname = req.body.firstname;
						User.lastname = req.body.lastname;
						User.save( respond );
					}
				}

				function respond( err, data ) {
					if ( err ) {
						res.json(
							{
								success: false,
								error: err,
								status: 500,
							}
						);
					}
					else {
						res.json(
							{
								success: true,
								error: null,
								data: data,
							}
						);
					}
				};
		}
	);

	return this;
};