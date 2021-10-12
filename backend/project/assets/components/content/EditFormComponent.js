import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useParams} from "react-router-dom";
import ReactDOM from 'react-dom'
import PokemonRandomCard from "../cards/PokemonRandomCard";
import PokemonSmallCard from "../cards/PokemonSmallCard";
import axios from "axios";
import ENDPOINTS from "../../config/consts";

const EditFormComponent = (props) => {

    const routeParams = useParams('id');
    const [teamName, setTeamName] = useState("");
    const [pokemons, setPokemons] = useState([])

    const addPokemonInTeam = (pokemon) => {
        setPokemons(prevState => [...prevState, pokemon])

    }

    const removeButtonHandler = (index) => {
        setPokemons(prevState => [
            ...prevState.filter((pokemonToRemove, indexPokemonToRemove) => {
                return indexPokemonToRemove !== index;
            })
        ])
    }

    const getTeamData = async () => {
        return await axios.get(`${ENDPOINTS.get_team_url}${routeParams.id}`);
    }

    const onTeamNameChange = (e) => {
        setTeamName(e.target.value);
    }

    const submit = (e) => {
        //Prevent page reload
        e.preventDefault();
        editTeam().then(() => {
            window.location.reload();
        })
    }

    const editTeam = async () => {
        await axios.put(`${ENDPOINTS.edit_team_url}${routeParams.id}`, {
            teamName: teamName,
            pokemons: pokemons
        })
    }


    useEffect(() => {

        getTeamData().then(({data}) => {
            const [team] = data;
            setTeamName(team.name);
            setPokemons(prevState => [
                ...prevState, ...team.pokemons_data
            ])

        })

    }, [])

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
                        id="inline-full-name" onChange={onTeamNameChange} placeholder={'insert team name'} value={teamName} type="text"/>
                </div>
            </div>
            <div className="container-cards">
                {pokemons.map((pokemon, index) => {
                    return <PokemonSmallCard editMode={true} removeButtonHandler={() => removeButtonHandler(index)} key={index} experience={pokemon.experience} imageUrl={pokemon.imageUrl} name={pokemon.name} />
                })}
            </div>
            <div className="py-6">Add another pokemon to team:</div>
            <PokemonRandomCard pokemonsLength={pokemons.length} addPokemonInTeam={addPokemonInTeam} />
            <div className="flex flex-col h-auto items-center justify-center">
                <div className="py-6">
                    <button onClick={editTeam} type='submit'
                            className="w-64 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                        {'Save Team'}
                    </button>
                </div>
            </div>
        </form>
    );

}

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/team/:id/edit'>
                <EditFormComponent/>
            </Route>
        </Switch>

    </Router>
    , document.getElementById('form-edit-team'));