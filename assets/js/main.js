/* FOSJsRoutingBundle */

const currentRoute 	= window.location.pathname;
const routes 		= require('../../public/js/fos_js_routes.json');

import Routing 		from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js';
import ContactForm 	from './contactForm.js';

Routing.setRoutingData(routes);

/* End FOSJsRoutingBundle */

jQuery(document).ready(function ($) 
{
	let contactForm = new ContactForm(Routing);

	// init contact page events
	if(currentRoute == "/contacto") contactForm.contactSectionEvents(Routing);

	// home contact form
	$("form#home-contact-form").on("submit", function(event)
	{
		event.preventDefault();
		contactForm.homeContactFormEvent();
	});

	//navbar click add class active
	$(".navbar-nav").on("click", "li", function () {
		$(".navbar-nav li").removeClass("active");
		$(this).addClass("active");
	});


	// On scroll header add background
	if( ! $("nav.navbar").hasClass("navbar-locked") ) 
	{

		$(window).scroll(function () {
			var a = 10;
			var pos = $(window).scrollTop();
			if (pos > a) {
				$(".header-top .navbar").css({
					background: '#7362de',
					transition: 'all 0.3s ease-in-out',
					height: 60,
				});
				$(".header-top .navbar").addClass("animated slideInDown");
			} else {
				$(".header-top .navbar").css({
					background: 'transparent'
				});
				$(".header-top .navbar").removeClass("animated slideInDown");
			}
		});

		$(window).scroll(function () {
			var a = 10;
			var pos = $(window).scrollTop();
			if (pos > a) {
				$(".articles .header-top .navbar").css({
					background: '#fff',
					transition: 'all 0.3s ease-in-out',
					height: 60,
				});
				$(".articles .header-top .navbar").addClass("animated slideInDown");
			} else {
				$(".articles .header-top .navbar").css({
					background: '#fff'
				});
				$(".articles .header-top .navbar").removeClass("animated slideInDown");
			}
		});

	}

	//Prevent default behavior of Anchor tag
	$("a.js-modal-btn").click(function (event) {
		return false;
	});

	// Click to scroll to next section
	$('.scrl-down').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 500, 'linear');
	});

	// On click change footer menu active
	$(".footer-menu li").on("click", function () {
		$(".footer-menu li").removeClass("active");
		$(this).addClass("active");
	});

	//Back to top
	$(window).scroll(function () {
		if ($(this).scrollTop() > 900) {
			$('.back-to-top').fadeIn();
		} else {
			$('.back-to-top').fadeOut();
		}
	});

	$(".back-to-top").click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 1000);
	});

	// cookies consent
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#3937a3"
        },
        "button": {
          "background": "#e62576"
        }
      },
      "theme": "edgeless",
      "content": {
        "message": "Este sitio web utiliza cookies para que usted tenga la mejor experiencia de usuario. Si continúa navegando está dando su consentimiento para la aceptación de las mencionadas cookies y de nuestra política de cookies.",
        "dismiss": "Aceptar",
        "link": "Más información",
        "href": "https://www.reaccionestudio.com/politica-de-cookies"
      }
    });
});
