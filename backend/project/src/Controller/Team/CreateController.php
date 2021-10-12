<?php

namespace App\Controller\Team;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CreateController extends AbstractController
{
    #[Route('/team/create', name: 'team_create')]
    public function index(): Response
    {
        return $this->render('team/create/index.html.twig', [
            'controller_name' => 'CreateController',
        ]);
    }
}
