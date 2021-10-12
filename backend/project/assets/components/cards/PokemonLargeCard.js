import React from "react";
import ReactDOM from "react-dom"
import axios from "axios";

const PokemonLargeCard = (props) => {
    

    const types = props.pokemonTypes ? props.pokemonTypes.map((types, index) => {
        return (
            <li className={"text-sm"} key={index}>
                - {types.type.name}
            </li>
        )
    }): '?'

    const abilities = props.pokemonAbilities ? props.pokemonAbilities.map((abilities, index) => {
        return (
            <li key={index} className="mb-1 flex items-center ">
                - {abilities.ability.name}
            </li> ?? ""
        )
    }) : "";

    return (
        <div className="shadow-lg rounded-2xl flex
        flex-col w-100 justify-center items-center bg-white dark:bg-gray-800 p-4"
        >
            <p className="text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">
                {props.pokemonImageUrl ? <img className="w-16" alt={props.name} src={props.pokemonImageUrl}/> : "?"}
            </p>
            <p className="text-gray-800 dark:text-gray-50 text-lg font-medium mb-4">
                {props.name ? props.name : "?"}
            </p>
            {props.pokemonBaseExperience ? (<section className="text-gray-900 dark:text-white text-xxs font-bold">
                {"Base experience:" + props.pokemonBaseExperience}
            </section>) : (<p>?</p>)}

            <div className="text-gray-600 dark:text-gray-100  text-xxs mt-4">
                <ul> Types:
                    {types}
                </ul>
            </div>
            {abilities ? (
                <ul className="text-xxs flex flex-col justify-center items-center text-gray-600 dark:text-gray-100 w-full mt-6 mb-6">
                    <p>Abilities:</p>
                    {abilities}
                </ul>
            ) : ("")}
        </div>
    );
}

export default PokemonLargeCard;

