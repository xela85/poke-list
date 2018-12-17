import { List } from 'immutable';



export interface Pokemon {
    name: string;
    url: string;
}

export class PokemonWithImage implements Pokemon {

    constructor(public id: number, public name: string, public url: string, public imageUrl: string) {
    }
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NameAndUrl;
}

export interface PokemonSprites {
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_shiny?: string;
    front_shiny_female?: string;
}

export interface NameAndUrl {
    name: string;
    url: string;
}

export interface PokemonType {
    type: NameAndUrl;
}

export interface PokemonDetails {
    
    name: string;
    weight: number;
    stats: List<PokemonStat>;
    sprites: PokemonSprites;
    types: List<PokemonType>

}