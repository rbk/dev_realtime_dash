
var md5 = require('MD5');
var sanitizer = require('sanitizer');
var mongoose = require('mongoose');


var Message = mongoose.model( 'Message', {
    message: String,
    date: { type: Date, default: Date.now }
});

module.exports = function(app){
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
			var new_message = sanitizer.escape(req.body.message);
			if( new_message != "" ){
				var message = new Message({ message: new_message });
				message.save(function( error, msg ){
					if( !error ){
						
					}
				});
				res.redirect('/');
			} else {
				res.redirect('/');				
			}
		})
		.put(function(req, res, next) {
			// update
		})
		.delete(function(req, res, next) {
			// destroy
		});
}