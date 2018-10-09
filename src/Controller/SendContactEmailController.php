<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\JsonResponse;
	use Symfony\Component\HttpFoundation\Request;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;

	class SendContactEmailController extends Controller
	{
		public function index(Request $request, \Swift_Mailer $mailer )
		{
			$subject 	= "Contacto Reaccion Estudio";
			$name 		= $request->request->get("name");
			$email 		= $request->request->get("email");
			$schedule	= $request->request->get("schedule");
			$mssg 		= $request->request->get("mssg");

			if( empty($name) || empty($email) || empty($mssg) )
			{
				return new JsonResponse([ "STATUS" => "KO" ]);
			}

			$mssgBody = "
						<h1>" . $subject . "</h1>
						<p><strong>Nombre: </strong>" . $name . "</p>
						<p><strong>Email: </strong>" . $email . "</p>
						<p><strong>Mensaje: </strong>" . $mssg . "</p>
						<p><strong>Fecha: </strong>" . ( new \DateTime() )->format('d/m/Y H:i:s') . "</p>
						";

			// send slack message
			try
			{
				$slackMssgBody = str_replace("<p>", "\n", $mssgBody);
				$slackMssgBody = strip_tags($slackMssgBody);

				$slack = $this->get('nexy_slack.client');
				$slackMessage = $slack->createMessage()->setText($slackMssgBody);
				$slack->sendMessage($slackMessage);
			}
			catch(\Exception $e)
			{
				// TODO: log error ...
			}

			// send email message
			try
			{
				$message = ( new \Swift_Message($subject) )
								->setFrom("info@reaccionestudio.com")
								->setTo("info@reaccionestudio.com")
								->setBody($mssgBody,"text/html")
							;

				$mailer->send($message);

				$status = "OK";
			}
			catch(\Exception $e)
			{
				$status = "KO";
			}

			return new JsonResponse([ "STATUS" => $status ]);
		}
	}