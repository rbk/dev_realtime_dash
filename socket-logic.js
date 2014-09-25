var mongoose = require('mongoose');
var Message = mongoose.model( 'Message' );

module.exports = function(io){
	io.on('connection', function(socket){
	    socket.emit('your socket id', socket.id);

	    // Send all messages to client as object
	    Message.find({}).sort('date').limit(100).exec(function (err, messages) {
	        if (err) return console.error(err);
	        socket.emit('connected', messages);
	    });


	    // Someone sends a message
	    // socket.on('chat message', function(data){
	    //     var sanitized_message = sanitizer.escape(data.message);
	    //     var message = new Message({ name: data.username, message: sanitized_message });
	    //     // Save Message to MongoDB
	    //     message.save(function (err) {
	    //         // Handle errors ***
	    //         if( err ){
	    //             io.emit('chat message', 'Something went wrong while saving your message');
	    //         } else {
	    //             // Send message to all sockets including yours!
	    //             io.emit('chat message', { username: data.username, message: sanitized_message });
	    //             socket.broadcast.emit('notify others', { username: data.username, message: sanitized_message });
	    //             console.log('SAVE MESSAGE')
	    //         }
	    //     });
	    // });

	    // socket.on('set username', function(username){
	    //     var user = User.find({username: username });
	    //     if( !user ){
	    //         var user = new User({username: sanitizer.escape(username), socket_id: socket.id});
	    //         user.save(function(err){
	    //             if( !err ){
	    //                 rbk_update_users_list();
	    //                 io.emit('user joined', username);
	    //             }
	    //         });
	    //     } else {
	    //     // console.log(username)
	    //         User.update({ id: username }, { username: username }, { multi: false }, function( err, doc ){
	    //             console.log(err )
	    //             if( !err ){

	    //             }
	    //         });
	    //         rbk_update_users_list();
	    //     }
	    // });
	    // socket.on('disconnect', function( res ){
	    //     var user = User.find({socket_id:socket.id}, function(err,user){
	    //         if( !err && user[0] ){
	    //             io.emit('user left', user[0].username);
	    //             User.remove({socket_id: socket.id}, function(err){
	    //                 rbk_update_users_list();
	    //             });
	    //         } else {
	    //             console.log( 'didn\'t find user' );
	    //         }
	    //     });
	    // });

	    // function rbk_update_users_list(  ){
	    //     User.find({},function (err, users) {
	    //         if( !err ){
	    //             io.emit( 'update user list', users);
	    //         }
	    //     });
	    // }
	}); // end io connect
}