<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;
	use App\Services\Seo;

	class ContactController extends Controller
	{
		public function index()
		{
			$seo = ( new Seo() )->setTitle("Contacta con nosotros")
								->setDescription("Ponte en contacto con nosotros para cualquier tipo de servicio, proyecto, presupuesto, información o duda.")
								;

			return $this->render("contact/contact.html.twig",
				[
					"seo" => $seo
				]
			);	
		}
	}