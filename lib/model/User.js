// users model
module.exports = function ( app ) {
	var schema = app.schema;

	var User = schema.define( 'users',
		{
			username: {
				type: String,
				length: 255,
			},
			firstname: {
				type: String,
				length: 255,
			},
			lastname: {
				type: String,
				length: 255,
			},
			created: {
				type: Date,
				default: Date.now,
			},
			updated: {
				type: Date,
				default: Date.now,
			},
		}
	);
	
	User.prototype.fullname = function() {
		return this.firstname + ' ' + this.lastname;
	};
	
	User.beforeUpdate = function( next, data ) {
		data.updated = new Date;
		next();
	};

	return User;
};