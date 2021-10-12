<?php

namespace App\Controller\Team;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeamListController extends AbstractController
{
    #[Route('/team/list', name: 'team_list')]
    public function index(): Response
    {
        return $this->render('team/team_list/index.html.twig', [
            'controller_name' => 'TeamListController',
        ]);
    }
}
