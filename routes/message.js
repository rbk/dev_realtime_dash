module.exports = function(app,Message){
	app.route('/messages')
		.get(function(req, res, next) {
			messages = Message.find({}, function(error,messages){
				if( !error ){
					res.json( messages );	
				} else {
					res.send('There was an error querying the database.');
				}
			});

		})
		.post(function(req, res, next) {
			var new_message = req.body.message;
			if( new_message != "" ){
				var message = new Message({name: 'noone', message: new_message });
				message.save(function( error, msg ){
					if( !error ){
						
					}
				});
				res.redirect('/messages');
			} else {
				res.redirect('/');				
			}
		})
		.put(function(req, res, next) {
		})
		.delete(function(req, res, next) {

		});
}