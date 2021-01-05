// Viewport

$(function() {

	var vh = window.innerHeight * 0.01;

	document.documentElement.style.setProperty('--vh', `${vh}px`);

});

// Tab Specification

$(function() {

	$('.tablink').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.tab-img').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.tab-product').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.tablink').on('click', function(e) {

		e.preventDefault();

		var dataTab = $(this).data('tab');
		var getWrapper = $(this).closest('.specification');

		getWrapper.find('.tab').removeClass('active');
		$(this).closest('.tab').addClass('active');
		getWrapper.find('.tab-img').removeClass('active');
		getWrapper.find('.tab-img[data-tab='+dataTab+']').addClass('active');
		getWrapper.find('.tab-product').removeClass('active');
		getWrapper.find('.tab-product[data-tab='+dataTab+']').addClass('active');

	});

});

// Timer

$(function() {

	function updater(d, h, m, s) {
		// День сброса - 27 сентября 2015 года (и далее каждые три дня)
		var baseTime = new Date(2018, 1, 6);
		// Период сброса — 3 дня
		var period = 3*24*60*60*1000;

		function update() {
			var cur = new Date();
			// сколько осталось миллисекунд
			var diff = period - (cur - baseTime) % period;
			// console.log(diff % 1000);
			// сколько миллисекунд до конца секунды
			var millis = diff % 1000;
			diff = Math.floor(diff/1000);
			// сколько секунд до конца минуты
			var sec = diff % 60;
			if(sec < 10) sec = "0"+sec;
			diff = Math.floor(diff/60);
			// сколько минут до конца часа
			var min = diff % 60;
			if(min < 10) min = "0"+min;
			diff = Math.floor(diff/60);
			// сколько часов до конца дня
			var hours = diff % 24;
			if(hours < 10) hours = "0"+hours;
			var days = Math.floor(diff / 24);
			d.innerHTML = days;
			h.innerHTML = hours;
			m.innerHTML = min;
			s.innerHTML = sec;

			// следующий раз вызываем себя, когда закончится текущая секунда

			setTimeout(update, millis);
		}

		setTimeout(update, 0);

	}

	updater(document.getElementById("days"),
			document.getElementById("hours"),
			document.getElementById("minutes"));

	updater(document.getElementById("days1"),
			document.getElementById("hours1"),
			document.getElementById("minutes1"),
			document.getElementById("seconds1"));
});

// Tab Catalog

$(function() {

	// Complects

	$('.cat-tablink').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.cat-img').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.cat-price-item').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	// Tanks

	$('.tank-tablink').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.tank-img').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.price-tank').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	// Complects

	$('.cat-tablink').on('click', function(e) {

		e.preventDefault();

		var dataTab = $(this).data('tab');
		var getWrapper = $(this).closest('.catalog');

		getWrapper.find('.cat-tab').removeClass('active');
		$(this).closest('.cat-tab').addClass('active');
		getWrapper.find('.cat-img').removeClass('active');
		getWrapper.find('.cat-img[data-tab='+dataTab+']').addClass('active');
		getWrapper.find('.cat-price-item').removeClass('active');
		getWrapper.find('.cat-price-item[data-tab='+dataTab+']').addClass('active');

	});

	// Tanks

	$('.tank-tablink').on('click', function(e) {

		e.preventDefault();

		var dataTab = $(this).data('tab');
		var getWrapper = $(this).closest('.catalog');

		getWrapper.find('.tank-tab').removeClass('active');
		$(this).closest('.tank-tab').addClass('active');
		getWrapper.find('.tank-img').removeClass('active');
		getWrapper.find('.tank-img[data-tab='+dataTab+']').addClass('active');
		getWrapper.find('.price-tank').removeClass('active');
		getWrapper.find('.price-tank[data-tab='+dataTab+']').addClass('active');

	});

});

// Tab Hallery

$(function() {

	$('.gal-tablink').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.tab-gallery-box').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.gal-tablink').on('click', function(e) {

		e.preventDefault();

		var dataTab = $(this).data('tab');
		var getWrapper = $(this).closest('.gallery');

		getWrapper.find('.tab-g').removeClass('active');
		$(this).closest('.tab-g').addClass('active');
		getWrapper.find('.tab-gallery-box').removeClass('active');
		getWrapper.find('.tab-gallery-box[data-tab='+dataTab+']').addClass('active');

	});

});

// Carusel

$(function() {
	$('#car-all, #car-zavod, #car-team, #car-polza, #rev-carusel, #video-instr, #adds-carusel, #modes').carousel({
		touch: true,
		interval: false
	})

	$("#car-all, #car-zavod, #car-team, #car-polza, #rev-carusel, #video-instr, #adds-carusel, #modes").swipe({

		swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

			if (direction == 'left') $(this).carousel('next');
			if (direction == 'right') $(this).carousel('prev');

		},

		allowPageScroll: "vertical"

	});
});

// Accardeon FAQ

$(function() {

	$('.accordeon .card>.collapse').not(':eq(1)').hide();
	$('.accordeon .card .x-link').not(':eq(1)').addClass('collapsed');

	// var findHeader = $('.accordeon').find('.card-header.active');
	// 	console.log('findHeader: ', findHeader);

	$('.accordeon .card .x-link').on('click', function(e) {
		e.preventDefault();
		console.log('click');
		
		var findCollapse = $(this).closest('.card-header').next('.collapse');
		console.log('findCollapse: ', findCollapse);

		var findWrapper = $(this).closest('.accordeon');
		console.log('findWrapper: ', findWrapper);

		$('.accordeon .card .card-header').removeClass('active');

		if ( findCollapse.is(':visible') ) {
			findCollapse.slideUp();
			findWrapper.find('.card .x-link').addClass('collapsed');
			// findActive.removeClass('active');
		} else {
			findWrapper.find('.card>.collapse').slideUp();
			findCollapse.slideDown();
			findWrapper.find('.card .x-link').addClass('collapsed');
			$(this).closest('.card-header').addClass('active');
			$(this).removeClass('collapsed');
		};

		
	});

});

// Modal Tab

$(function() {

	$('.m-tab-link').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.m-img').each(function(i) {
		$(this).attr('data-tab', 'tab'+i)
	});

	$('.m-tab-link').on('click', function(e) {

		e.preventDefault();

		var dataTab = $(this).data('tab');
		var getWrapper = $(this).closest('.m-tab-img');

		getWrapper.find('.m-tab-link').removeClass('active');
		$(this).closest('.m-tab-link').addClass('active');
		getWrapper.find('.m-img').removeClass('active');
		getWrapper.find('.m-img[data-tab='+dataTab+']').addClass('active');

	});

});

// Scroll to

$(function() {

	$('.header-nav a').click( function(){ // ловим клик по ссылке с классом go_to
	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 75}, 2000); // анимируем скроолинг к элементу scroll_el

	    if ( $(window).width() < 768 && $(this).hasClass('h-menu') ) {
	    	// console.log(this);
	    	$('.icon').toggleClass('active');
	    	var menu = $('#menu');
	    	menu.slideToggle();
	    };

	    $('.icon').toggleClass('active');

		var menu = $('#menu');

		menu.slideToggle();
	}
	    return false; // выключаем стандартное действие
	});

});

// Scroll to

$(function() {

	$('#scroll, .banner a, .bannerm a').click( function(){ // ловим клик по ссылке с классом go_to
	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 75}, 2000); // анимируем скроолинг к элементу scroll_el
	}
	    return false; // выключаем стандартное действие
	});

});

// Drag img

$(function() {

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

// Phone Mask

$(function() {
	$('[type="tel"]').mask('+389999999999');
});

//E-mail Ajax Send

$(function() {

	$("#header-call-form, #bf-call, #header-buy-form, #akciya-form, #book-form, #faq-form-container, #c_fourteen, #c_twentyfive, #c_thirtyfive, #adds-nasadka-form, #adds-regulyator-form, #adds-ten-form, #adds-mufta-form, #adds-deflegmator-form, #adds-jioptr-form, #adds-popugai-form, #adds-areometri-form, #footer-call-form").submit(function() { //Change
		var th = $(this);

		$.ajax({
			type: "POST",
			url: "rest.php", //Change
			data: th.serialize()
		}).done(function() {
			// alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 500);
			location.href = "https://kolonna-samogon.com.ua/sps/";
		});
		return false;
	});

});

// Burger bar 

$(function() {
	
	$('.icon').on('click', function(e) {
		e.preventDefault();

		$('.icon').toggleClass('active');

		var menu = $('#menu');

		menu.slideToggle();
	});

});

// Carusel Off

$(function() {

	var carInner = $('#video-instr-car').find('[data-item="item"]');
	var carInnerAdds = $('#adds-carusel-car').find('[data-item="item"]');


	if ( $(window).width() > 767 ) {
		
		carInner.addClass('active');
		carInnerAdds.addClass('active');

	}

});

// Menu BGC White

$(function() {

	// When the user scrolls the page, execute myFunction
	window.onscroll = function() {myFunction()};

	// Get the navbar
	var wehave = document.getElementById("wehave");
	var navbar = document.getElementById("nav-sticky");

	// Get the offset position of the navbar
	var paintMenu = wehave.offsetTop;

	// Add the sticky class to the navbar
	function myFunction() {
		if (window.pageYOffset >= paintMenu) {
			navbar.classList.add("whiteMenu");
			navbar.classList.add("showMenu"); // fridayblack
		} else {
			navbar.classList.remove("whiteMenu");
			navbar.classList.remove("showMenu"); // fridayblack
		}
	}

});

// catalog-lk hover

// $(function() {

// 	$( '.c_fourteen' ).hover(
// 		function() {
// 			$(this).attr('src', 'img/jpg/catalog-lk/c_suh.jpg');
// 		}, function() {
// 			$(this).attr('src', 'img/jpg/catalog-lk/c_14litr.jpg');
// 		}
// 	);

// 	$( '.c_twentyfive' ).hover(
// 		function() {
// 			$(this).attr('src', 'img/jpg/catalog-lk/c_suh.jpg');
// 		}, function() {
// 			$(this).attr('src', 'img/jpg/catalog-lk/c_25litr.jpg');
// 		}
// 	);

// 	$( '.c_thirtyfive' ).hover(
// 		function() {
// 			$(this).attr('src', 'img/jpg/catalog-lk/c_suh.jpg');
// 		}, function() {
// 			$(this).attr('src', 'img/jpg/catalog-lk/c_35litr.jpg');
// 		}
// 	);

// });