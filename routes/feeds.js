var pass = require('./../config/pass');
var sanitizer = require('sanitizer');
var mongoose = require('mongoose');


var Feed = mongoose.model( 'Feed', {
    url: String,
    title: String,
    user_id: String,
    order: Number
});

module.exports = function(app){
	app.route('/feed')
		.get( pass.ensureAuthenticated, function(req, res, next) {
			var user_id = req.user.id;
			feeds = Feed.find({ user_id: user_id }, function(error,feeds){
				if( !error ){
					res.json( feeds );	
				}
			});
		})
		.post( pass.ensureAuthenticated, function(req, res, next) {
			var user_id = req.user.id;
			var url = sanitizer.escape(req.body.feed_url );
			var title = sanitizer.escape(req.body.feed_title );

			var feed = new Feed({ url: url, title: title, user_id: user_id });
			feed.save(function( err, msg ){
				if(!err){
					// res.json({ message: 'Saved' });			
				};
			});
			res.redirect('/');
		})
		.put(function(req, res, next) {
			// update
		})
		.delete(function(req, res, next) {
			// destroy
		});
}