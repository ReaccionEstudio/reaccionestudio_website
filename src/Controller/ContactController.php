<?php

	namespace App\Controller;

	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Bundle\FrameworkBundle\Controller\Controller;

	class ContactController extends Controller
	{
		public function index()
		{
			return $this->render("contact/contact.html.twig");	
		}
	}