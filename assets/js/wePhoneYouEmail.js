class WePhoneYouEmail
{
	sendEmail(ctrlRoute, formSelector, name, phone, schedule, product)
	{
		if( name.val().length && phone.val().length && schedule.val().length )
		{
			name.removeClass("is-invalid");
			phone.removeClass("is-invalid");
			schedule.removeClass("is-invalid");

			$(formSelector + " div.alert").remove();
			$(formSelector + " button[type='submit']").hide();
			$(formSelector + " button[type='submit']").after(
				'<i class="fas fa-sync-alt fa-spin" style="font-size:38px;"></i>'
			);

			$.ajax(
			{
				type: 	"POST",
				url: 	ctrlRoute,
				data: {
					"name" 		: name.val(),
					"phone" 	: phone.val(),
					"schedule" 	: schedule.val(),
					"product"	: product.val()
				},
				success: function(result)
				{
					if(result.STATUS == "OK")
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
							<p>Se ha producido un error al enviar los datos.<br />Por favor, inténtelo de nuevo.</p>\
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
			if( ! name.val().length) 		name.addClass("is-invalid");
			if( ! phone.val().length) 		phone.addClass("is-invalid");
			if( ! schedule.val().length) 	schedule.addClass("is-invalid");
		}
	}
}

export default WePhoneYouEmail;