var mongoose = require('mongoose');
var sanitizer    = require('sanitizer');

var ChatUser = mongoose.model( 'ChatUser', {
	username: { type: String, required: true, unique: true, Default: 'Guest' + Math.floor(Math.random()*10000) },
	socket_id: String
});
var Message = mongoose.model( 'Message', {
    username: String,
    message: String,
    date: { type: Date, default: Date.now }
});


module.exports = function(io){
	io.on('connection', function(socket){
	    socket.emit('your socket id', socket.id);

	    Message.find({}).sort('date').limit(100).exec(function (err, messages) {
	        if (err) return console.error(err);
	        socket.emit('connected', messages);
	    });

	    socket.on('new_user', function(username){
    		ChatUser.update({username: username}, { $set: { socket_id: socket.id }}, function(err, user){
    			if(err){return false};
    			if( user == 0 ){
			    	var new_user = new ChatUser({ username: username, socket_id: socket.id });
			    	new_user.save(function( err, user ){
			    		if(err){return false;}
	    				rbk_update_users_list();
			    	});    				
    			}
    		});
	    });

	    socket.on('chat message', function(data){
	        var sanitized_message = sanitizer.escape(data.message);
	        var message = new Message({ username: data.username, message: sanitized_message });
	        message.save(function (err) {
	        	if(err){return};
	            io.emit('chat message', { username: data.username, message: sanitized_message });
	            //Notifications...// socket.broadcast.emit('notify others', { username: data.username, message: sanitized_message });
	        });
	    });

	    socket.on('disconnect', function( res ){
	    	// console.log( res );
            ChatUser.remove({socket_id: socket.id}, function(err){
            	if(err){return};
                rbk_update_users_list();
            });	            
	    });

	    function rbk_update_users_list(){
	        ChatUser.find({},function (err, users) { if( !err ){ io.emit( 'update user list', users); } });
	    }
	}); // end io connect
}