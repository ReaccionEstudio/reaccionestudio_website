class DefaultContactForm
{
	sendEmail(formSelector, name, email, mssg, sendEmailRoute)
	{
		if( name.val().length && email.val().length && mssg.val().length )
		{
			name.removeClass("is-invalid");
			email.removeClass("is-invalid");
			mssg.removeClass("is-invalid");

			$(formSelector + " div.alert").remove();
			$(formSelector + " button[type='submit']").hide();
			$(formSelector + " button[type='submit']").after(
				'<i class="fas fa-sync-alt fa-spin" style="font-size:38px;"></i>'
			);

			$.ajax(
			{
				type: 	"POST",
				url: 	sendEmailRoute,
				dataType: 'json',
				data: {
					"name" 	: name.val(),
					"email" : email.val(),
					"mssg" 	: mssg.val()
				},
				success: function(result)
				{
					console.log(result);
					if(result.ok === true)
					{
						$(formSelector).prepend(
							'<div class="alert alert-success">\
								<p>Su mensaje se ha enviado correctamente. Nos pondremos en contacto con usted lo antes posible. Gracias.</p>\
							</div>'
						);
					}
					else
					{
						$(formSelector).prepend(
							'<div class="alert alert-danger">\
								<p>Se ha producido un error al enviar el mesaje.<br />Por favor, inténtelo de nuevo.</p>\
							</div>'
						);
					}

					$(formSelector).find("i.fa-sync-alt").remove();
					$(formSelector + " button[type='submit']").show();
				},
				error: function (err)
				{
					$(formSelector).prepend(
						'<div class="alert alert-danger">\
							<p>Se ha producido un error al enviar el mesaje.<br />Por favor, inténtelo de nuevo.</p>\
						</div>'
					);

					$(formSelector).find("i.fa-sync-alt").remove();
					$(formSelector + " button[type='submit']").show();

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
}

export default DefaultContactForm;