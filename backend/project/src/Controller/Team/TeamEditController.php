<?php

namespace App\Controller\Team;

use App\Entity\Team;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeamEditController extends AbstractController
{
    /**
     * @param $id
     * @return object|null
     */
    public function getTeam($id)
    {
       return $this->getDoctrine()->getRepository(Team::class)
            ->find($id);
    }

    #[Route('/team/{id}/edit', name: 'team_team_edit')]
    public function index($id): Response
    {
        $teamData = $this->getTeam($id);

        if(!$teamData) {
            return new Response('The team does not exist', Response::HTTP_NOT_FOUND);
        }

        return $this->render('team/team_edit/index.html.twig', [
            'controller_name' => 'TeamEditController',
            'team_data' => $teamData
        ]);
    }
}
