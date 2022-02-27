export interface PokemonModel {
    id: number;
    name: string;
    image: string;
    type: string;
    hp: number;
    attack: number,
    defense: number,
    idAuthor: number,
    created_at: Date;
    updated_at: Date;
}

export interface RequestCreatePokemon {
    name: string;
    image: string;
    type: string;
    hp: number;
    attack: number,
    defense: number,
    idAuthor: number
}

export interface RequestUpdatePokemon {
    name: string;
    image: string;
    attack: number,
    defense: number
}