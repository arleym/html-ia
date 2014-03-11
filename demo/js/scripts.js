$(function(){

	$.get('sitemap.html', function(data) {
		$('.hierarchy').each(function() {
			$(this).append($(data));
		});

		// Add necessary classes to hierarchy to make styles work. The goal is to make copy/pastable lists
		$('.hierarchy > ol').first().addClass('ia group');
		$('.hierarchy .ia li > ol').first().addClass('primary group');
		$('.hierarchy li').contents().filter(function() {
		    return this.nodeType === 3 && $.trim(this.nodeValue).length;
		}).wrap('<span/>');



		// If there are sub pages in an LI give it a class of parent.
		$('.ia li').each(function() {
			if ( $(this).find('ol,ul').length ) {
			   $(this).addClass('parent');
			}
		});



		// Set horizontal scroll!
		var sum = 0;
		$('.flow .primary > li').each( function(){ 
			sum += $(this).outerWidth(); 
		});
		$('.flow .primary').width( sum + 100 );

		// Set it the way I want it to look
		$('.overview .tab, #toggle-second').click();
	});



	//Expand / collapse overview;
	$('body').on('click', '.toggle-overview', function() {
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
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
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
		}   // esc
	});



	// Show / Hide Tools
	$('.tool-toggle').click(function() {
		$('.tools').toggle();
	});


	// Show / Hide List parents
	// It's nasty, but we need to cover all the UL / OL variants not knowing the copy / pastability from the original source. 
	$('#toggle-first').click(function() {
		$('.flow .primary > li > ol, .flow .primary > li > ul').slideToggle();
	});

	$('#toggle-second').click(function() {
		$('.flow .primary > li > ol > li ol, .flow .primary > li > ol > li ul, .flow .primary > li > ul > li ol, .flow .primary > li > ul > li ulfi').slideToggle();
	});
	$('#show-all').click(function() {
		$('.flow .primary ul, .flow .primary ol').slideDown();
	});

	$('body').on('click', '.parent a, .parent span', function() {
		$(this).next('ol, ul').slideToggle();
	});


}); //jQuery