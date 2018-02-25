<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;
	use App\Services\Seo;

	class HomeController extends Controller
	{
		public function index()
		{
			$seo = ( new Seo() )->setTitle("Tecnología a tu alcance")
								->setDescription("Pon tu negocio en órbita y hazlo crecer hacia el infinito con la última tecnología disponible en La Tierra.En Reacción Estudio somos expertos en lanzar y gestionar proyectos dentro de este gran universo llamado InternetN.seo o te quedes ahí parado y descubre todo lo que te podemos ofrecer.")
								;

			return $this->render("home/home.html.twig", 
				[
					"seo" => $seo
				]
			);
		}
	}