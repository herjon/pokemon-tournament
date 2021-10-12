class PokemonObject {
    constructor(
        name,
        pokemonImageUrl,
        pokemonBaseExperience,
        pokemonAbilities,
        pokemonTypes
    ) {
        this._name = name;
        this._pokemonImageUrl = pokemonImageUrl;
        this._pokemonBaseExperience = pokemonBaseExperience;
        this._pokemonAbilities = pokemonAbilities;
        this._pokemonTypes = pokemonTypes;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get pokemonImageUrl() {
        return this._pokemonImageUrl;
    }

    set pokemonImageUrl(value) {
        this._pokemonImageUrl = value;
    }

    get pokemonBaseExperience() {
        return this._pokemonBaseExperience;
    }

    set pokemonBaseExperience(value) {
        this._pokemonBaseExperience = value;
    }

    get pokemonAbilities() {
        return this._pokemonAbilities;
    }

    set pokemonAbilities(value) {
        this._pokemonAbilities = value;
    }

    get pokemonTypes() {
        return this._pokemonTypes;
    }

    set pokemonTypes(value) {
        this._pokemonTypes = value;
    }
}

export default PokemonObject;