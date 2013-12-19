// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

(function($){

	$(document).ready(function (){
	
		$('#menu-nav').appendTo('#menu-header');
		
		// Find the right method, call on correct element
		function launchFullScreen(element) {
			if(element.requestFullScreen) {
				element.requestFullScreen();
			} else if(element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if(element.webkitRequestFullScreen) {
				element.webkitRequestFullScreen();
			}
		}

		$('html.fullscreen body').on('click', '#fullscreenSwitch', function(e) {
			
			launchFullScreen(document.documentElement);
		
		});
		
		$('#menu-nav').on('click', function(e) {
			
			e.preventDefault();
			
			$('#menu-nav ol').toggle();
			
		});
		
		$('#menu-nav ol a').on('click', function(e) {
			
			e.stopPropagation();
		
		});
	
	});
	
	$(window).load(function() {
		
		var fullscreenSwitch = '<span id="fullscreenSwitch" class="fullscreenSwitch"><span></span></span>';
		
		$('html.fullscreen body').append(fullscreenSwitch);
	
	});

})(window.jQuery);