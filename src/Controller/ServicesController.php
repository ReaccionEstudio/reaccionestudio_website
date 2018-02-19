<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;

	class ServicesController extends Controller
	{
		public function index()
		{
			return $this->render("services/services.html.twig");
		}
	}