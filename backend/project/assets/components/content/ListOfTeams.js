import React, {Fragment, useEffect, useState} from "react";
import ReactDOM from "react-dom"
import axios from "axios";
import ENDPOINTS from "../../config/consts"
import PokemonLargeCard from "../cards/PokemonLargeCard";

const ListOfTeams = (props) => {
    const [teams, setTeams] = useState([])
    const [filterTypesValue, setfilterTypesValue] = useState('');
    const getTeamsData = async () => {
        return await axios.get(ENDPOINTS.get_all_teams_url);
    }

    const filterTypeRequest = async () => {
        return await axios.get(`${ENDPOINTS.search_pokemon_by_types}${filterTypesValue}`)
    }

    const getTotalExperienceTeam = (teamId) => {
        let result = 0;
        teams.map((team) => {
            if (team.id === teamId) {
                team.pokemons_data.map((pokemon) => {
                    result += pokemon.experience
                })
            }
        })
        return result;
    }

    const dispatchfilterTypesValue = (e) => {
        e.preventDefault();
        filterTypeRequest().then(({data}) => {
            setTeams(prevState => [...data])
        })

    }

    const filterTypeChange = (e) => {
        setfilterTypesValue(e.target.value);
    }

    useEffect(() => {
        getTeamsData().then(({data}) => {
            setTeams(prevState => [...prevState, ...data])
        })

    }, [])

    return (
        <div className="divide-y divide-yellow-500">
            <div className="py-4 flex flex-row">
                <form onSubmit={dispatchfilterTypesValue}>
                    <input placeholder={"ex. Fire"} className={"px-4"} onChange={filterTypeChange} type={'text'}/>
                    <button type="submit" className={"px-4"}>Filter type</button>
                </form>

            </div>

            {teams.map((team, index) => {
                return (
                    <Fragment key={index}>
                        <div className="team-container py-8">
                            <p>Team Name: {team.name}</p>
                            <p>Total Experience: {getTotalExperienceTeam(team.id)}</p>
                            <div className="container-cards py-8">
                                {team.pokemons_data.map((pokemon, index) => {
                                    return <PokemonLargeCard
                                        name={pokemon.name}
                                        pokemonImageUrl={pokemon.imageUrl}
                                        key={index}
                                        pokemonTypes={pokemon.types}
                                        pokemonBaseExperience={pokemon.experience}
                                        pokemonAbilities={pokemon.abilities}

                                    />
                                })}
                            </div>
                            <a href={`${team.id}/edit`} type="button"
                               className={"w-64 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"}>
                                {"Edit Team"}
                            </a>
                        </div>
                    </Fragment>
                )
            })}
        </div>

    );

}

ReactDOM.render(
    <ListOfTeams/>
    , document.getElementById("list-of-teams"));