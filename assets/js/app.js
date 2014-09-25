$(function(){
	console.log( 'App.js Ready' );

	function column_heights(){
		$('.column .inner').fadeIn();
		$('.column .inner').animate({'height': $(window).height() - 20 }, { queue: false });
	}
	$(window).resize(function(){
		column_heights();
	});
	column_heights();
	
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