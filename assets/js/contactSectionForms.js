import DefaultContactForm 	from './defaultContactForm.js';
import WePhoneYouEmail 		from './wePhoneYouEmail.js';

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

		$("form#we-phone-you-form").on("submit", function(e)
		{
			this.wePhoneYouForm();
		});
	}

	mainContactForm()
	{
		let formSelector = "form#contact-form";
		let defaultContactForm = new DefaultContactForm();
			defaultContactForm.sendEmail(
				formSelector,
				$(formSelector + " input#fullname"), 
				$(formSelector + " input#email"), 
				$(formSelector + " textarea#message"), 
				this.routing.generate('sendContactEmail')
			);
	}

	wePhoneYouForm()
	{
		let formSelector 	= "form#we-phone-you-form";
		let wePhoneYouEmail = new WePhoneYouEmail();
			wePhoneYouEmail.sendEmail(
				this.routing.generate("wePhoneYouEmail"),
				formSelector,
				$(formSelector + " input#wePhoneYou_name"),
				$(formSelector + " input#wePhoneYou_phone"),
				$(formSelector + " input#wePhoneYou_schedule"),
				$(formSelector + " input#wePhoneYou_product")
			);
	}
}

export default ContactSectionForms;