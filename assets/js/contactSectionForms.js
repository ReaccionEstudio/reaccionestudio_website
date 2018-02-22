import DefaultContactForm from './defaultContactForm.js';

class ContactSectionForms
{
	constructor(Routing)
	{
		this.routing = Routing;
	}

	events()
	{
		let _self = this;

		$("form#contact-form").on("submit", function(e)
		{
			e.preventDefault();
			_self.mainContactForm();
		});

		// this.wePhoneYouForm();
	}

	mainContactForm()
	{
		let defaultContactForm = new DefaultContactForm();
			defaultContactForm.sendEmail(
				"form#contact-form", 
				$("form#contact-form input#fullname"), 
				$("form#contact-form input#email"), 
				$("form#contact-form textarea#message"), 
				this.routing.generate('sendContactEmail')
			);
	}

	wePhoneYouForm()
	{

	}
}

export default ContactSectionForms;