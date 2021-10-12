<?php

namespace App\Api\Pokemon\v1;

use App\Services\PokemonApi;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GetPokemonDataApi extends AbstractController
{
    const MAX_POKEMON_FIND = 640;
    /**
     * @var PokemonApi
     */
    protected $pokeApi;

    public function __construct(PokemonApi $pokeApi)
    {
        $this->pokeApi = $pokeApi;
    }

    #[Route('/api/v1/get/pokemon', name: 'api_v1_get_pokemon')]
    public function randomPokemon(): JsonResponse
    {
        return $this->json(json_decode($this->pokeApi->pokemon(rand(1, self::MAX_POKEMON_FIND))));
    }
}
