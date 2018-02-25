<?php

	namespace App\Services;

	final class Seo
	{
		private $title;
		private $description;

		public function setTitle(String $title) : Seo
		{
			$this->title = $title;
			return $this;
		}

		public function getTitle()
		{
			return $this->title;
		}

		public function setDescription(String $description) : Seo
		{
			$this->description = $description;
			return $this;
		}

		public function getDescription()
		{
			return $this->description;
		}
	}