<?php

	namespace App\Controller;

	use Psr\Log\LoggerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
	use Symfony\Component\HttpFoundation\Request;
    use Telegram;

    /**
     * Class SendContactEmailController
     * @package App\Controller
     */
    class SendContactEmailController extends AbstractController
	{
        /**
         * @param Request $request
         * @param LoggerInterface $logger
         * @return JsonResponse
         * @throws \Exception
         */
        public function index(Request $request, LoggerInterface $logger)
		{
			$subject 	= "Contacto Reaccion Estudio";
			$name 		= $request->request->get("name");
			$email 		= $request->request->get("email");
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

			try
			{
			    // Send message to TelegramBot
                $mssgBody = strip_tags($mssgBody);

                $botKey = $this->getParameter('telegram_bot_key');
                $botChatId = $this->getParameter('telegram_bot_chat_id');

                $telegram = new Telegram($botKey);
                $content = array('chat_id' => $botChatId, 'text' => $mssgBody);
                $telegram->sendMessage($content);

                // Save contact log
                $context = [ 'message' => $mssgBody ];
                $logger->alert('Contact message sent to TelegramBot.', $context);
			}
			catch(\Exception $e)
			{
			    $context = [ 'message' => $mssgBody, 'exception' => $e ];
				$logger->error('Error sending contact message to TelegramBot.', $context);
			}

			exit;
		}
	}