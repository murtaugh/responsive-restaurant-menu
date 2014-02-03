// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }

(function($){

	var storeCurrentValue, addItemTimer;
	
	var addItemElement = '<span class="add-item"></span>';

	var newItem = '<li>\
				<dl itemscope itemprop="menu-item">\
					<dt itemprop="item-name" spellcheck="false" contenteditable="true" class="empty" data-placeholder="item name">\
					<dd itemprop="item-price" spellcheck="false" contenteditable="true" class="empty" data-placeholder="price">\
					<dd itemprop="item-description" spellcheck="false" contenteditable="true" class="empty" data-placeholder="description">\
				</dl>\
			</li>';

	$(document).ready(function (){
	
		/*$('[itemprop~="menu-section"] ol').on('mouseover', function() {
			
			//console.log('show add item element');
			
			clearTimeout(addItemTimer);
			$('.add-item').remove();
			
			$(this).append(addItemElement);
			
		});*/
	
		/*$('[itemprop~="menu-section"] ol').on('mouseleave', function() {
			
			addItemTimer = setTimeout(function () {
			
				console.log(addItemTimer);
			
				$('.add-item').remove();
			
			}, 1000);
			
		});*/
		
		$(document).on('click', '.add-item', function() {
			
			console.log('add new item');
			
			$(this).parent().append(newItem);
		
		});
	
		$('body:not(.fullscreen-true)').on('focus', '[contenteditable=true]', function(e) {
			
			e.stopImmediatePropagation();
			
			editBegin(this);
			
		});
	
		$('body.editing').on('blur', '[contenteditable=true]', function() {
				
			//console.log('blur cancel'); // contenteditable elements don't seem to be throwing a blur event
			
		});
		
		$(window).on('blur, focus', function() {
			
			console.log('window event');
			editCancel();
			
		});
		
		$('body').click(function(e) {
			
			if ($(e.target).is('[contenteditable=true]')) {
			 	
				console.log('cancel event bubble');
				return false;
				
			} else {
			 
			 	console.log('clicked non-editable object');
			 	editCancel();
				
			};
			
		});
		
		$('html').on('keydown', 'body.editing', function(e) {
		
			if (e.which == 13) {
				
				e.preventDefault();
				
				editSuccess();
				
			} else if (e.which == 27) {
				
				editCancel();
				
			};
			
		});

		$('html.fullscreen body:not(.fullscreen-true)').on('click', '#fullscreenSwitch', function(e) {
			
			if (screenfull.enabled) {
			
				screenfull.request();
			
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
			
	$('#menu-nav').appendTo('#menu-header');
	
	var fullscreenSwitch = '<span id="fullscreenSwitch" class="fullscreenSwitch"><span></span></span>';
	
	if (screenfull.enabled) {
		
		$('html.fullscreen body').append(fullscreenSwitch);
	
		document.addEventListener(screenfull.raw.fullscreenchange, function () {
			
			if (screenfull.isFullscreen) {
				
				console.log('entering full screen');
				
				$('body').addClass('fullscreen-true');
				
				$('[contenteditable]').attr('contenteditable', false);
				
			} else {
				
				console.log('exiting full screen');
				
				$('body').removeClass('fullscreen-true');
				
				$('[contenteditable]').attr('contenteditable', true);
				
			};
			
		});
		
	};
	
	function editBegin(which) {
	
		editSuccess();
		
		$('body').addClass('editing');
		
		storeCurrentValue = $(which).html();
	
		console.log('begin editing: ' + storeCurrentValue);
			
	};
	
	function editSuccess() {
	
		if (!isEmpty($('*:focus'))) {
		
			$('*:focus').removeClass('empty, left-empty');
			
		};
		
		$("*:focus").blur();
				
		$('body').removeClass('editing');
		
		console.log('done editing');
		
	};
	
	function editCancel() {
		
		console.log('edit cancel');
				
		$("*:focus").html(storeCurrentValue).blur();
		
		$('body').removeClass('editing');
		
	};
	
	function isEmpty(el){
		return !$.trim(el.html())
	};

})(window.jQuery);