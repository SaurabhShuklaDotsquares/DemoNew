//Slider
$('.header-slider').owlCarousel({
	loop: true,
	margin: 0,
	nav: false,
	dots: true,
	autoplay: true,
	autoplayTimeout: 8000,
	responsive: {
		0: {
			items: 1,
		},
		600: {
			items: 1,
		},
		1000: {
			items: 1,
		},
	},
});
$('.services-slider').owlCarousel({
	loop: true,
	margin: 15,
	nav: true,
	dots: false,
	responsive: {
		0: {
			items: 1,
		},
		576: {
			items: 2,
		},
		992: {
			items: 3,
		},
		1000: {
			items: 4,
		},
	},
});
$('.product-slider').owlCarousel({
	loop: true,
	margin: 30,
	dots: false,
	nav: true,
	responsive: {
		0: {
			items: 1,
		},
		375: {
			items: 2,
			margin: 10,
		},
		575: {
			items: 3,
			margin: 10,
		},
		768: {
			items: 4,
			margin: 10,
		},
		1200: {
			items: 5,
		},
		1500: {
			items: 6,
		},
	},
});

$('.deal-slider').owlCarousel({
	loop: true,
	margin: 30,
	dots: false,
	nav: true,
	responsive: {
		0: {
			items: 1,
		},
		375: {
			items: 1,
			margin: 10,
		},
		575: {
			items: 2,
			margin: 10,
		},
		768: {
			items: 2,
			margin: 10,
		},
		1200: {
			items: 3,
		},
		1500: {
			items: 3,
		},
	},
});
//Header
//Header
$(document).on('scroll', function () {
	if ($(document).scrollTop() > 50) {
		$('.header').addClass('header-shrink');
	} else {
		$('.header').removeClass('header-shrink');
	}
});

/*search bar*/

$(document).ready(function () {
	$('.search-btn-mobile').click(function () {
		$('.search-field').slideToggle('search-field-open');
	});
});

$(function ($) {
	var options = {
		minimum: 1,
		maximize: 10,
		onChange: valChanged,
		onMinimum: function (e) {
			console.log('reached minimum: ' + e);
		},
		onMaximize: function (e) {
			console.log('reached maximize' + e);
		},
	};
	// $('#handleCounter').handleCounter(options)
	// $('#handleCounter2').handleCounter(options)
	// $('#handleCounter3').handleCounter({maximize: 100})
});
function valChanged(d) {
	//            console.log(d)
}

//Shop slider
$('.shop-banner-slider').owlCarousel({
	loop: true,
	margin: 0,
	nav: false,
	dots: true,
	responsive: {
		0: {
			items: 1,
		},
		576: {
			items: 1,
		},
		992: {
			items: 1,
		},
		1000: {
			items: 1,
		},
	},
});

//Shop slider Listing page
$('.product-slider-list').owlCarousel({
	loop: true,
	margin: 30,
	dots: false,
	nav: true,
	responsive: {
		0: {
			items: 1,
		},
		414: {
			items: 2,
			margin: 10,
		},
		575: {
			items: 2,
			margin: 15,
		},
		768: {
			items: 2,
			margin: 15,
		},
		992: {
			items: 3,
			margin: 15,
		},

		1199: {
			items: 4,
			margin: 30,
		},
	},
});

//listing slider

$('.listing-slider').owlCarousel({
	loop: true,
	margin: 0,
	nav: false,
	dots: true,
	autoplay: true,
	autoplayTimeout: 8000,
	responsive: {
		0: {
			items: 1,
		},
		600: {
			items: 1,
		},
		1000: {
			items: 1,
		},
	},
});
