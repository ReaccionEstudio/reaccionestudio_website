<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\JsonResponse;
	use Symfony\Component\HttpFoundation\Request;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;

	class SendWePhoneYouEmailController extends Controller
	{
		public function index(Request $request, \Swift_Mailer $mailer )
		{
			$subject 	= "Nosotros te llamamos - Reaccion Estudio";
			$name 		= $request->request->get("name");
			$phone 		= $request->request->get("phone");
			$schedule	= $request->request->get("schedule");
			$mssg		= $request->request->get("msgg");

			if( empty($name) || empty($phone) || empty($schedule) )
			{
				return new JsonResponse([ "STATUS" => "KO" ]);
			}

			$mssgBody = "
						<h1>" . $subject . "</h1>
						<p><strong>Nombre: </strong>" . $name . "</p>
						<p><strong>Teléfono: </strong>" . $phone . "</p>
						<p><strong>Horario de llamada: </strong>" . $schedule . "</p>
						<p><strong>Interesado en: </strong>" . $mssg . "</p>
						<p><strong>Fecha: </strong>" . ( new \DateTime() )->format('d/m/Y H:i:s') . "</p>
						";

			$message = ( new \Swift_Message($subject) )
							->setFrom("info@reaccionestudio.com")
							->setTo("info@reaccionestudio.com")
							->setBody($mssgBody,"text/html")
						;

			$res 	= $mailer->send($message);
			$status = ($res) ? "OK" : "KO";

			return new JsonResponse([ "STATUS" => $status ]);
		}
	}