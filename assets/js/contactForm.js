import ContactSectionForms 	from './contactSectionForms.js';
import DefaultContactForm 	from './defaultContactForm.js';

class ContactForm
{
	constructor(routing)
	{
		this.routing = routing;
	}

	homeContactFormEvent()
	{
		let defaultContactForm = new DefaultContactForm();
			defaultContactForm.sendEmail(
				"form#home-contact-form", 
				$("form#home-contact-form input#fullname"), 
				$("form#home-contact-form input#email"), 
				$("form#home-contact-form textarea#message"), 
				this.routing.generate('sendContactEmail')
			);
	}

	contactSectionEvents(Routing)
	{
		let contactSectionForms = new ContactSectionForms(Routing);
		contactSectionForms.events();
	}
}

export default ContactForm;