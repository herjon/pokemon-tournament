import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import PokemonRandomCard from "../cards/PokemonRandomCard";
import PokemonSmallCard from "../cards/PokemonSmallCard";
import axios from "axios";
import ENDPOINTS from "../../config/consts";

const CreateFormComponent = (props) => {

    const [teamName, setTeamName] = useState('');
    const [pokemons, setPokemons] = useState([])

    const addPokemonInTeam = (pokemon) => {
        setPokemons(prevState => [...prevState, pokemon])
    }

    const teamNameChangeEvent = (e) => {
        setTeamName(e.target.value)
    }

    const submit = (e) => {
        //Prevent page reload
        e.preventDefault();
        createTeam().then(() => {
            window.location.reload();
        })
    }

    const createTeam = async () => {
        await axios.post(ENDPOINTS.add_team_url, {
            teamName: teamName,
            pokemons: pokemons
        })
    }


    return (
        <form onSubmit={submit} className="w-full">
            <div className="md:flex md:items-center my-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                           htmlFor="inline-full-name">
                        Team Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        maxLength={"255"}
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" onBlur={teamNameChangeEvent} placeholder={'insert team name'} type="text"/>
                </div>
            </div>
            <PokemonRandomCard pokemonsLength={pokemons.length} addPokemonInTeam={addPokemonInTeam} />
            <div className="container-cards">
                {pokemons.map((pokemon, index) => {
                    return <PokemonSmallCard key={index} experience={pokemon.experience} imageUrl={pokemon.imageUrl} name={pokemon.name} />
                })}
            </div>
            <div className="flex flex-col h-auto items-center justify-center">
                <div className="py-6">
                    <button type='submit'
                        className="w-64 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                        {'Save Team'}
                    </button>
                </div>
            </div>
        </form>
    );

}
ReactDOM.render(
    <CreateFormComponent/>
    , document.getElementById('form-create-team'));