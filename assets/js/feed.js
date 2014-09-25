$(function(){

	$.get('/feed', function(feeds){
		console.log( feeds )
		for( var i =0; i < feeds.length; i++ ){
			var url = feeds[i].url;
			var feed_title = feeds[i].title;	
			$.ajax({
				type: "GET",
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
				dataType: 'json',
				error: function(){
					alert('Unable to load feed, Incorrect path or invalid feed');
				},
				success: function(xml){
					if( xml.responseData != null ){
						values = xml.responseData.feed.entries;
						var feed = $('<div />', { class: 'feed' });
						feed.append( $('<h1 />', {text: feed_title }) );
						for( var i =0; i < 5; i++ ){
							var title = values[i].title;
							var link = values[i].link;
							feed.append( $('<a />',{ href: link, text: title, target: '_blank' }) );
						}
						$('.feeds').append( feed );
					}
				}
			});
		}
	});
	
});