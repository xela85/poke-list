import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Pokemon } from '../model/pokemon';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Output() pokemons: Observable<List<Pokemon>>;

  @Output() currentPage: number;
  
  constructor(private pokemonService: PokemonListService) {
    this.pokemons = pokemonService.pokemons$;
  }

  ngOnInit() {
    this.pokemonService.loadPokemons();
  }

  pageChange(newPage: number) {
    this.currentPage = newPage;
  }

}
