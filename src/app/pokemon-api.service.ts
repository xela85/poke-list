import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import {List, update} from 'immutable';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonWithImage, PokemonDetails } from './model/pokemon';

const POKE_API_URL = "https://pokeapi.co/api/v2"
const SPRITES_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"


interface GetPokemonsApiResult {
  results: List<Pokemon>;
}

class PokemonDetailsWithOpponents {
    pokemonDetails: PokemonDetails;     
}

@Injectable({
  providedIn: 'root'
})
export class PokemonApi {

  constructor(private http: HttpClient) {}

  private pokemonsFromServer: List<PokemonWithImage> = List();

  private _pokemonList: BehaviorSubject<List<PokemonWithImage>> = new BehaviorSubject(this.pokemonsFromServer);

  public pokemons$: Observable<List<PokemonWithImage>> = this._pokemonList.asObservable();


  public getPokemons(): Observable<List<PokemonWithImage>> {
    return this.http.get<GetPokemonsApiResult>(`${POKE_API_URL}/pokemon/`)
        .pipe(map(a => {
            const withImage = a.results.map(p => {
                const pokeId = Number(p.url.split('/').reverse()[1]);
                return new PokemonWithImage(pokeId, p.name.replace("-", " "), p.url, `${SPRITES_URL}/${pokeId}.png`);
              })
            return withImage;
        }));
  }



  public getPokemonDetails(id: number): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${POKE_API_URL}/pokemon/${id}/`);
  }


}
