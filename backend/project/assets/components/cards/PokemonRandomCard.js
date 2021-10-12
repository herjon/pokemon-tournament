import React, {useState} from "react";
import axios from "axios";
import PokemonObject from "../objects/PokemonObject";
import ENDPOINTS from "../../config/consts";

const PokemonRandomCard = (props) => {
    const maxPokemon = 6;
    const [pokemon, setPokemon] = useState(new PokemonObject(
        "",
        "",
        [],
        "",
        ""
    ))

    const catchRandomPokemonHandler = (pokemon) => {
        props.addPokemonInTeam(
            {
                name: pokemon.name,
                imageUrl: pokemon.pokemonImageUrl,
                abilities: pokemon.pokemonAbilities,
                types: pokemon.pokemonTypes,
                experience: pokemon.pokemonBaseExperience
            })
    }

    const clearStates = () => {
        const pokemonEmpty = new PokemonObject(
            "",
            [],
            [],
            "",
            ""
        )
        setPokemon(prevState => ({
            ...prevState,
            pokemonEmpty

        }))
    }

    const catchPokemonClickHandler = () => {
        clearStates();
        getPokemon()
            .then((data) => {
                let newPokemon = new PokemonObject(
                    data.name,
                    data.sprites.other.dream_world.front_default,
                    data.base_experience,
                    data.abilities,
                    data.types
                );

                setPokemon(new PokemonObject(
                    newPokemon.name,
                    newPokemon.pokemonImageUrl,
                    newPokemon.pokemonBaseExperience,
                    newPokemon.pokemonAbilities,
                    newPokemon.pokemonTypes
                ));

                catchRandomPokemonHandler(newPokemon);
            })
    }

    const getPokemon = async () => {
        let response = await axios.get(ENDPOINTS.get_pokemon_url)
            .catch((error) => {
                console.log(error.response)
            });

        return response.data;
    }

    const types = pokemon.pokemonTypes ? pokemon.pokemonTypes.map((types, index) => {
        return (
            <li key={index}>
                - {types.type.name}
            </li>
        )
    }) : "?"

    const abilities = pokemon.pokemonAbilities ? pokemon.pokemonAbilities.map((abilities, index) => {
        return (
            <li key={index} className="mb-1 flex items-center ">
                - {abilities.ability.name}
            </li>
        );
    }) : "?";



    return (
        <div className="shadow-lg rounded-2xl flex
        flex-col w-100 justify-center items-center bg-white dark:bg-gray-800 p-4"
        >
            <p className="text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">
                {pokemon.pokemonImageUrl ?
                    (<img className="w-16" alt={pokemon.name} src={pokemon.pokemonImageUrl}/>) : "?"}
            </p>
            <p className="text-gray-800 dark:text-gray-50 text-lg font-medium mb-4">
                {pokemon.name ? pokemon.name : "?"}
            </p>
            {pokemon.pokemonBaseExperience ? (<section className="text-gray-900 dark:text-white text-xxs font-bold">
                {"Base experience:" + pokemon.pokemonBaseExperience}
                <div className="relative pt-1 w-auto">
                    <div className="overflow-hidden h-2 text-xxs flex rounded bg-purple-200">
                        <div style={{"width": pokemon.pokemonBaseExperience}}
                             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500">
                        </div>
                    </div>
                </div>
            </section>) : (<p>?</p>)}

            <div className="text-gray-600 dark:text-gray-100  text-xxs mt-4">
                <ul> Types:
                    {types}
                </ul>
            </div>
            {abilities ? (
                <ul className="text-sm flex flex-col justify-center items-center text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
                    <p>Abilities:</p>
                    {abilities}
                </ul>
            ) : ("")}

            <button type="button" disabled={props.pokemonsLength >= maxPokemon} onClick={catchPokemonClickHandler}
                    className={"py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " + (props.pokemonsLength >= maxPokemon ? "disabled:opacity-50" : "")}>
                {"Gotta catch'em all"}
            </button>
        </div>
    );

}

export default PokemonRandomCard;

