$(function(){
	console.log( 'Chat.js loaded.' );

	var socket = io();
	// socket.on('your socket id', function(id){
	// 	console.log( 'Your socket id:' + id );
	// });
	socket.on('connected', function(messages){
		console.log( messages );
	});



}); // end ready