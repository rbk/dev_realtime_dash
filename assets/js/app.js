$(function(){

	var socket = io();
	var pageVisibility = false;

	var current_menu_item = localStorage.getItem( 'app-box-chat-menu' );
	if( current_menu_item ){
		$('#' + current_menu_item).css({'z-index':'9999'});
		$('a[href=#' + current_menu_item+']').parent('li').addClass('current');
	}
	// chat nav
	$('#app-box #header nav a').click(function(e){
		e.preventDefault();
		var id = $(this).attr('href').replace('#', '');
		$('.page').css({'z-index':'1'});
		$('#app-box #header li').removeClass('current');
		$('#' + id).css({'z-index':'999'});
		$(this).parent('li').addClass('current');
		localStorage.setItem("app-box-chat-menu", id);
	});
	var current_room = localStorage.getItem( 'app-box-room-id' );

	var temp_name = 'Guest' + Math.floor(Math.random()*10000000);
	var username = localStorage.getItem('app-box-username');
	if( !username ){
		localStorage.setItem('app-box-username', temp_name);
		username = temp_name;
	}
	socket.emit( 'set username', username);


$(function() {
    window.isActive = true;
    $(window).focus(function() { this.isActive = true;  pageVisibility = true;});
    $(window).blur(function() { this.isActive = false; pageVisibility = false; });
});

	// console.log(  )
/*
*
*	Chat room logic
*
**/


	socket.on('your socket id', function(id){
		// console.log( 'Your socket id:' + id );
	});
	

	// Connected
	socket.on('connected', function (data) {
		if( $('#messages').length > 0 ){
			for( var i=0; i<data.length;i++ ){
				rbk_message( data[i].name, data[i].message );
			}
		}
	});


	// Send Message
	$('#send-message').click(function(){
		var message = $('#message').val();
		if( message.length > 0 ){
			socket.emit('chat message', {username: username, message: message });
			$('#message').val('');
		}
		return false;
	});


	// Receive Message
	socket.on('chat message', function(data){
		rbk_message( data.username, data.message );
		$('#message-board').scrollTop( $('#messages').height() + 100 )
	});

	socket.on('notify others', function(data){
		if( Notification.permission === "granted" && pageVisibility == false){
			var notification = new Notification(data.username + ': ' + data.message);
		}
	})


	function rbk_message( name, msg ){
		var message_tempate = '<li><strong>{{name}}</strong>:&nbsp;{{message}}</li>';
		message_tempate = message_tempate.replace('{{name}}', name );
		var new_message = message_tempate.replace('{{message}}', msg );
		$('#messages').append(new_message);
		$('#message-board').scrollTop( $('#messages').height() + 100 );
	}


	// If has cookie with user name then don't show modal // check for cookie on connection
	$.get('/session', function(session_id){
		if( session_id ){
			socket.emit('check user', session_id);
		}
	});


	socket.on( 'get nickname', function(user){
		if( user.newuser ){
			$('#chatModal').modal();
		} else {
			$('#user-list').append( '<li class="'+user.socket_id+'">'+user.username+'</li>' );
		}
	});


	

	socket.on( 'remove user', function(id){
		$('.'+id).remove();
		$('#messages').append( 
			message_tempate.replace('{{name}}', 'System' ).replace('{{message}}', 'Someone left??' ) 
		);

	});


// GOOD

	


	socket.on('update user list',function(users){
		$('#user-list li').remove();
		for( var i=0;i<users.length;i++ ){
			$('#user-list').append('<li>'+users[i].username+'</li>');
		}
		$('#message-board').scrollTop( $('#messages').height() + 100 );
	});

	socket.on('user joined',function(name){
		$('#messages').append('<li class="system">'+name+'&nbsp;joined.</li>')
	});

	socket.on('user left',function(name){
		$('#messages').append('<li class="system">'+name+'&nbsp;left.</li>')
	});


	$('#username').on('keyup', function(){
		localStorage.setItem('app-box-username', $(this).val() );
		socket.emit( 'set username', $(this).val() );
	});

	$('#notificationsToggle, .enable-n').on('click',function(e){
		e.preventDefault();
		notifyMe('You have just enabled notifications!');
	})


}); // end document ready wrap


function notifyMe(msg) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg);
  }

  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure we store the information
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(msg);
      }
    });
  }

  // At last, if the user already denied any notification, and you 
  // want to be respectful there is no need to bother them any more.
}