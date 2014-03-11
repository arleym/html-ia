$(function(){

	/**
	 * Load up the sitemap.html - it's going to go into the .hierarchy containers
	 * @param  {String} data The contents of sitemap.html
	 */
	$.get('sitemap.html', function(data) {
		$('.hierarchy').each(function() {
			$(this).append($(data));
		});

		applyRequiredClasses($('.hierarchy'));
		setupHorizontalScroll();
	});


	/**
	 * Sets up the classes for the IA styles - will apply the [.ai .group .primary, etc] classes where needed
	 * @param  {JQuery Object} container  The container[s] that contain your IA data
	 */
	function applyRequiredClasses(container) {
		// Add necessary classes to hierarchy to make styles work. The goal is to make copy/pastable lists
		container.find('> ol').first().addClass('ia group');
		container.find('.ia li > ol').first().addClass('primary group');
		container.find('li').contents().filter(function() {
		    return this.nodeType === 3 && $.trim(this.nodeValue).length;
		}).wrap('<span/>');

		// If there are sub pages in an LI give it a class of parent.
		container.find('.ia li').each(function() {
			if ($(this).find('ol,ul').length ) {
			   $(this).addClass('parent');
			}
		});
	};

	/**
	 * Sets up the horizontal scroll for the IA diagram - Applies explicit widths to the elements allowing the page to
	 * scroll horizontally
	 */
	function setupHorizontalScroll() {
		// Set horizontal scroll!
		var sum = 0;
		$('.flow .primary > li').each( function(){ 
			sum += $(this).outerWidth(); 
		});
		$('.flow .primary').width( sum + 100 );

		// Set it the way I want it to look
		$('.overview .tab, #toggle-second').click();
	}


	/**
	 * The click handler that does it all! Shows and hides all of the sub-trees in the IA
	 * If it is a parent -> Slide toggle its child ol/ul elements!
	 */
	$('body').on('click', '.parent a, .parent span', function() {
		$(this).next('ol, ul').slideToggle();
	});


	//   ____                       _               
	//  / __ \                     (_)              
	// | |  | |_   _____ _ ____   ___  _____      __
	// | |  | \ \ / / _ \ '__\ \ / / |/ _ \ \ /\ / /
	// | |__| |\ V /  __/ |   \ V /| |  __/\ V  V / 
	//  \____/  \_/ \___|_|    \_/ |_|\___| \_/\_/ 
	// 
	
	/**
	 * Toggles the overview visibility - Open or closed
	 */
	function toggleOverviewVisibility() {
		var overviewWidth = $('.overview').outerWidth();

	    if ($('.wrapper').hasClass('open') ) {
	        $('.overview').animate({left: -overviewWidth}, 200); 
	        $('.flow').animate({left: -overviewWidth}, 200);          
	        $('.wrapper').removeClass('open');
	    } else {
	        $('.overview').animate({left:'0'}, 200);   
	        $('.flow').animate({left:'0'}, 200); 
	        $('.wrapper').addClass('open');
	    }
	}
	
	/**
	 * Click handler for the .toggle-overview button - Toggles the sidebar open and closed
	 */
	$('body').on('click', '.toggle-overview', function() {
		toggleOverviewVisibility();
	});

	/**
	 * Key up handler -> if the user hits ESC - toggle the overview!
	 * @param  {KeyboardEvent} e 
	 */
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			toggleOverviewVisibility();
		}   // esc
	});




	//  _______          _     
	// |__   __|        | |    
	//    | | ___   ___ | |___ 
	//    | |/ _ \ / _ \| / __|
	//    | | (_) | (_) | \__ \
	//    |_|\___/ \___/|_|___/
	
	/**
	 * Click handler for the .tool-toggle - shows and hinds the tools
	 */
	$('.tool-toggle').click(function() {
		$('.tools').toggle();
	});

	/**
	 * Toggle first click handler - toggles visibility of the entire first row of hierarchy 
	 */
	$('#toggle-first').click(function() {
		$('.flow .primary > li > ol, .flow .primary > li > ul').slideToggle();
	});

	/**
	 * Toggle second click handler - toggles visiblity of the entire second row of hierarchy
	 * @return {[type]} [description]
	 */
	$('#toggle-second').click(function() {
		$('.flow .primary > li > ol > li ol, .flow .primary > li > ol > li ul, .flow .primary > li > ul > li ol, .flow .primary > li > ul > li ulfi').slideToggle();
	});

	/**
	 * Show all click handler - Shows EVERYTHING in the IA diagram!
	 */
	$('#show-all').click(function() {
		$('.flow .primary ul, .flow .primary ol').slideDown();
	});



}); //jQuery