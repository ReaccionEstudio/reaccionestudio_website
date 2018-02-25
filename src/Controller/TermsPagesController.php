<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;
	use App\Services\Seo;

	class TermsPagesController extends Controller
	{
		public function cookies()
		{
			$seo = ( new Seo() )->setTitle("Política de cookies");

			return $this->render(
				"terms/cookies.html.twig", 
				[
					"seo" 			=> $seo,
					"navbarLocked" 	=> true
				]
			);	
		}
	}