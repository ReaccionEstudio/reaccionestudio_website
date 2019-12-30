<?php

	namespace App\Controller;

	use Psr\Log\LoggerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
	use Symfony\Component\HttpFoundation\Request;
    use Telegram;

    /**
     * Class SendWePhoneYouEmailController
     * @package App\Controller
     */
    class SendWePhoneYouEmailController extends AbstractController
	{
        /**
         * @param Request $request
         * @param LoggerInterface $logger
         * @return JsonResponse
         * @throws \Exception
         */
        public function index(Request $request, LoggerInterface $logger)
		{
			$subject 	= "Nosotros te llamamos - Reaccion Estudio";
			$name 		= $request->request->get("name");
			$phone 		= $request->request->get("phone");
			$schedule	= $request->request->get("schedule");
			$product	= $request->request->get("product");

			if( empty($name) || empty($phone) || empty($schedule) )
			{
				return new JsonResponse([ "STATUS" => "KO" ]);
			}

			$mssgBody = "
						<h1>" . $subject . "</h1>
						<p><strong>Nombre: </strong>" . $name . "</p>
						<p><strong>Teléfono: </strong>" . $phone . "</p>
						<p><strong>Horario de llamada: </strong>" . $schedule . "</p>
						<p><strong>Interesado en: </strong>" . $product . "</p>
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
                $logger->info('`We phone you` message sent to TelegramBot.', $context);
			}
			catch(\Exception $e)
			{
                $context = [ 'message' => $mssgBody, 'exception' => $e ];
                $logger->error('Error sending `We phone you` message to TelegramBot.', $context);
			}

            exit;
		}
	}