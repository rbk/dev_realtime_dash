$(function(){
	console.log( 'Chat.js loaded.' );

	var socket = io();

	socket.on('connected', function (data) {
		if( $('#messages').length > 0 ){
			for( var i=0; i<data.length;i++ ){
				rbk_message( data[i].username, data[i].message );
			}
		}
		socket.emit('new_user', username);
	});	

	socket.on('update user list',function(users){
		$('#user-list li').remove();
		for( var i=0;i<users.length;i++ ){
			$('#user-list').append('<li class="username">'+users[i].username+'</li>');
		}
	});
	socket.on('chat message', function(data){
		rbk_message( data.username, data.message );
		$('#message-board').scrollTop( $('#messages').height() + 100 )
	});
	$('#send-message').click(function(e){
		e.preventDefault();
		var message = $('#message').val();
		if( message.length > 0 ){
			socket.emit('chat message', {username: username, message: message });
			$('#message').val('');
		}
		return false;
	});
	function rbk_message( name, msg ){
		var message_tempate = '<li><strong class="username">{{name}}</strong>:&nbsp;{{message}}</li>';
		message_tempate = message_tempate.replace('{{name}}', name );
		var new_message = message_tempate.replace('{{message}}', msg );
		$('#messages').append(new_message);
		$('#message-board').scrollTop( $('#messages').height() + 100 );
	}
// undefined: http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0
// undefined: http://stackoverflow.com/questions/9832019/how-to-organize-large-node-js-projects
// undefined: https://dribbble.com/shots/1023229-Ultramarine-Admin/attachments/122802

}); // end ready