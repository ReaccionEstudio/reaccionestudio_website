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
			$.post(sendEmailRoute, 
			{
				"name" 	: name.val(),
				"email" : email.val(),
				"mssg" 	: mssg.val()
			}, 
			function(result)
			{
				if(result.status == "OK")
				{

				}
				else
				{
					
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
}

export default ContactForm;