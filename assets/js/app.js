$(function(){
	console.log( 'App.js Ready' );

	var socket = io();
	socket.on('your socket id', function(id){
		console.log( 'Your socket id:' + id );
	});
	socket.on('connected', function(messages){
		console.log( messages );
	});
	function column_heights(){
		$('.column .inner').fadeIn();
		$('.column .inner').animate({'height': $(window).height() - 20 }, { queue: false });
	}
	$(window).resize(function(){
		column_heights();
	});
	column_heights();

	// var url = 'https://news.ycombinator.com/rss';
	// $.ajax({
	// 	type: "GET",
	// 	url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
	// 	dataType: 'json',
	// 	error: function(){
	// 		alert('Unable to load feed, Incorrect path or invalid feed');
	// 	},
	// 	success: function(xml){
	// 		values = xml.responseData.feed.entries;
	// 		var feed = $('<div />', { class: 'feed' });
	// 		feed.append( $('<h1 />', {text: 'Hacker News' }) );
	// 		for( var i =0; i < 5; i++ ){
	// 			var title = values[i].title;
	// 			var link = values[i].link;
	// 			feed.append( $('<a />',{ href: link, text: title, target: '_blank' }) );
	// 		}
	// 		$('.feeds').append( feed );
	// 	}
	// });
	// var url = 'http://news.google.com/?output=rss';
	// $.ajax({
	// 	type: "GET",
	// 	url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
	// 	dataType: 'json',
	// 	error: function(){
	// 		alert('Unable to load feed, Incorrect path or invalid feed');
	// 	},
	// 	success: function(xml){
	// 		values = xml.responseData.feed.entries;
	// 		var feed = $('<div />', { class: 'feed' });
	// 		feed.append( $('<h1 />', {text: 'Google News'}) );
	// 		for( var i =0; i < 5; i++ ){
	// 			var title = values[i].title;
	// 			var link = values[i].link;
	// 			feed.append( $('<a />',{ href: link, text: title, target: '_blank' }) );
	// 		}
	// 		$('.feeds').append( feed );
	// 	}
	// });


	$(document).on('click', '.add', function(){
		var options_block = $(this).next('.options');
		if( $(this).hasClass('active') ){
			options_block.animate({'height': 0, 'width' : 0 }, { queue: false, duration: 400 });
			$(this).removeClass('active');
			options_block.fadeOut(400);
		} else {
			$(this).addClass('active');
			options_block.fadeIn(400);
			options_block.animate({'height': $('.column').height(), 'width' : '100%' }, { queue: false, duration: 400 });
			
		}

	});



});