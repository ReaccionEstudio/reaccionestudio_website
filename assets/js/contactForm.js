import ContactSectionForms from './contactSectionForms.js';

class ContactForm
{
	constructor(routing)
	{
		this.routing = routing;
	}

	homeContactFormEvent()
	{
		let sendEmailRoute = this.routing.generate('sendContactEmail');
		
		let name 	= $("form#home-contact-form input#fullname");
		let email 	= $("form#home-contact-form input#email");
		let mssg 	= $("form#home-contact-form textarea#message");

		if( name.val().length && email.val().length && mssg.val().length )
		{
			$("form#home-contact-form div.alert").remove();
			$("form#home-contact-form button[type='submit']").hide();
			$("form#home-contact-form button[type='submit']").after(
				'<i class="fa fa-refresh fa-spin" style="font-size:38px;"></i>'
			);

			$.ajax(
			{
				type: 	"POST",
				url: 	sendEmailRoute,
				data: {
					"name" 	: name.val(),
					"email" : email.val(),
					"mssg" 	: mssg.val()
				},
				success: function(result)
				{
					if(result.STATUS == "OK")
					{
						$("form#home-contact-form").prepend(
							'<div class="alert alert-success">\
								<p>Su mensaje se ha enviado correctamente. Nos pondremos en contacto con usted lo antes posible. Gracias.</p>\
							</div>'
						);
					}
					else
					{
						$("form#home-contact-form").prepend(
							'<div class="alert alert-danger">\
								<p>Se ha producido un error al enviar el mesaje.<br />Por favor, inténtelo de nuevo.</p>\
							</div>'
						);
					}

					$("form#home-contact-form").find("i.fa-refresh").remove();
					$("form#home-contact-form button[type='submit']").show();
				},
				error: function (err)
				{
					$("form#home-contact-form").prepend(
						'<div class="alert alert-danger">\
							<p>Se ha producido un error al enviar el mesaje.<br />Por favor, inténtelo de nuevo.</p>\
						</div>'
					);

					$("form#home-contact-form").find("i.fa-refresh").remove();
					$("form#home-contact-form button[type='submit']").show();

					console.log(err);
				}
			});
		}
		else
		{
			if( ! name.val().length) 	name.addClass("is-invalid");
			if( ! email.val().length) 	email.addClass("is-invalid");
			if( ! mssg.val().length) 	mssg.addClass("is-invalid");
		}
	}

	contactSectionEvents()
	{
		let contactSectionForms = new ContactSectionForms();
		contactSectionForms.events();
	}
}

export default ContactForm;