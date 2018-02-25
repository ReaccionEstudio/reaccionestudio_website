<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;
	use App\Services\Seo;

	class ServicesController extends Controller
	{
		public function index()
		{
			$seo = ( new Seo() )->setTitle("Servicios")
								->setDescription("Nuestros servicios se basan en en desarrollo de software, desarrollo web, desarrollo de apps móviles, alquiler de servidores y servicios de Marketing digital.")
								;

			return $this->render("services/services.html.twig",
				[
					"seo" => $seo
				]
			);
		}
	}