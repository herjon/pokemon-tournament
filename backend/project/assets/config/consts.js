const API_VERSION = "v1"

const ENDPOINTS = {
    edit_team_url: `/api/${API_VERSION}/team/edit/`,
    get_pokemon_url: `/api/${API_VERSION}/get/pokemon`,
    add_team_url: `/api/${API_VERSION}/team/add`,
    get_all_teams_url: `/api/${API_VERSION}/team/all`,
    get_team_url: `/api/${API_VERSION}/team/`,
    search_pokemon_by_types: `/api/${API_VERSION}/team/filterType?term=`
}

export default ENDPOINTS;
