import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {List} from 'immutable';
import { Pokemon, PokemonWithImage } from '../model/pokemon';
import { PokemonApi } from '../pokemon-api.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonListService {

  constructor(private pokemonApi: PokemonApi) {}

  private pokemonsFromServer: List<PokemonWithImage> = List();

  private _pokemonList: BehaviorSubject<List<PokemonWithImage>> = new BehaviorSubject(this.pokemonsFromServer);

  public pokemons$: Observable<List<PokemonWithImage>> = this._pokemonList.asObservable();


  public loadPokemons(): void {
    this.pokemonApi.getPokemons().subscribe(res => {
      this.pokemonsFromServer = res
      this._pokemonList.next(res);
    });
  }
  
  public filterPokemons(predicate: (p: Pokemon) => boolean): void {
    this._pokemonList.next(this.pokemonsFromServer.filter(predicate))      
  }

}
