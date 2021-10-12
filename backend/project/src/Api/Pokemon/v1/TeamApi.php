<?php

namespace App\Api\Pokemon\v1;

use App\Entity\Team;
use App\Repository\TeamRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\Cache\CacheInterface;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TeamApi extends AbstractController
{
    /**
     * @var Team
     */
    protected Team $team;

    /**
     * @var CacheInterface
     */
    protected CacheInterface $cache;

    public function __construct(CacheInterface $cache)
    {
        $this->cache = $cache;
    }

    private function typeExistInPokemon($pokemon, $term)
    {
        $arrTypes = [];
        foreach ($pokemon['types'] as ['type' => $type]) {
            $arrTypes[] = $type['name'];
        }

        return \in_array($term, $arrTypes);
    }

    /**
     * @param $team
     * @param $key
     * @param $term
     */
    private function filterPokemonByTypes(&$team, $key, $term)
    {
        foreach ($team['pokemons_data'] as $pokemonIndex => $pokemon_data) {
            if (!$this->typeExistInPokemon($pokemon_data, $term[0])) {
                unset($team['pokemons_data'][$pokemonIndex]);
            }
        }

        $reorderArrayIndices = \array_values($team['pokemons_data']);
        $team["pokemons_data"] = $reorderArrayIndices;
    }


    #[Route('/api/v1/team/all', name: 'api_v1_team_all', methods: ['GET'])]
    public function getAll(): JsonResponse
    {
        $repository = $this->getDoctrine()->getRepository(Team::class);

        $teamListCacheItem = $this->cache
            ->get(
                Team::CACHE_KEY,
                function (ItemInterface $itemTeamList) use ($repository) {
                    if (!$itemTeamList->isHit()) {
                        return $repository->findAllInJson();
                    }

                    return $itemTeamList;
                }
            );


        return $this->json($teamListCacheItem);
    }

    #[Route('/api/v1/team/filterType', name: 'api_v1_team_filter', methods: ['GET'])]
    public function filterByType(Request $request): JsonResponse
    {
        $repository = $this->getDoctrine()->getRepository(Team::class);
        $filteredTeams = $repository->findAllInJson();
        $term = $request->get('term');
        if (strlen($term)) {
            \array_walk($filteredTeams, [$this, 'filterPokemonByTypes'], [$term]);
        }

        return $this->json(\array_values($filteredTeams));
    }

    #[Route('/api/v1/team/{id}', name: 'api_v1_team_get', methods: ['GET'])]
    public function getTeam($id): JsonResponse
    {
        /**
         * @var TeamRepository $repository
         */
        $repository = $this->getDoctrine()->getRepository(Team::class);
        $result = $repository->getTeamById($id);
        return $this->json($result);
    }

    #[Route('/api/v1/team/add', name: 'api_v1_team_add', methods: ['POST'])]
    public function add(Request $request): JsonResponse
    {
        $connection = $this->getDoctrine()->getManager();
        $req = json_decode($request->getContent(), true);

        $team = new Team();
        $team->setName($req[Team::TEAM_NAME_KEY_REQUEST]);
        $team->setPokemonsData($req[Team::POKEMONS_KEY_REQUEST]);
        $connection->persist($team);

        $connection->flush();
        $this->cache->delete(Team::CACHE_KEY);
        return $this->json(["status" => 'ok', 'error' => '']);
    }

    #[Route('/api/v1/team/edit/{id}', name: 'api_v1_team_edit', methods: ['PUT'])]
    public function edit($id, Request $request): JsonResponse
    {
        $repository = $this->getDoctrine()->getRepository(Team::class);
        /**
         * @var Team $team
         */
        $team = $repository->find($id);
        if (!$team) {
            return $this->json(["status" => 'ko', 'error' => 'No team found!']);
        }
        $req = json_decode($request->getContent(), true);

        $team->setName($req[Team::TEAM_NAME_KEY_REQUEST]);
        $team->setPokemonsData($req[Team::POKEMONS_KEY_REQUEST]);

        $this->getDoctrine()->getManager()->flush();
        $this->cache->delete(Team::CACHE_KEY);
        return $this->json(["status" => 'ok', 'error' => '']);
    }

}
