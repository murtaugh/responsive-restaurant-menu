// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

(function($){

	$(document).ready(function (){
	
		$('body:not(.editing)').on('focus', '[contenteditable]', function() {
			
			$('body').addClass('editing');
		
			storeCurrentValue = $(this).html();
		
			console.log(storeCurrentValue);
			
		});
	
		$('body.editing').on('blur', '[contenteditable]', function() {
				
				console.log('blur cancel');
				
				//$("*:focus").html(storeCurrentValue).blur();
				
				//$('body').removeClass('editing');
			
		});
		
		$('html').on('keydown', 'body.editing', function(e) {
		
			if (e.which == 13) {
				
				e.preventDefault();
				
				$("*:focus").blur();
				
				$('body').removeClass('editing');
				
				console.log('done editing');
				
			} else if (e.which == 27) {
				
				console.log('escape cancel');
				
				$("*:focus").html(storeCurrentValue).blur();
				
				$('body').removeClass('editing');
				
			};
			
		});
		
		$('html').on('keydown', 'body.fullscreen-true', function(e) {
		
			if (e.which == 27) {
				
				console.log('exiting full screen');
				
			};
			
		});
			
		$('#menu-nav').appendTo('#menu-header');

		$('html.fullscreen body:not(.fullscreen-true)').on('click', '#fullscreenSwitch', function(e) {
			
			if (screenfull.enabled) {
			
				screenfull.request();
				
				$('body').addClass('fullscreen-true');
			
			} else {
			
				alert('fullscreen not supported by this browser');
			
			}
		
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
	
	if (screenfull.enabled) {
	
		document.addEventListener(screenfull.raw.fullscreenchange, function () {
		
			console.log('Am I fullscreen? ' + (screenfull.isFullscreen ? 'Yes' : 'No'));
			
		});
		
	};

})(window.jQuery);