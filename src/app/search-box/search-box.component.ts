import { Component, Input } from '@angular/core';
import { PokemonListService } from '../pokemon-list/pokemon-list.service';
import { debounce, } from 'rxjs/operators';
import { timer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Pokemon } from '../model/pokemon';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @Input() searchField = new FormControl('');

  constructor(private pokemonService: PokemonListService) { 
    this.searchField.valueChanges.pipe(debounce(() => timer(20)))
      .subscribe(searchedName => this.pokemonService.filterPokemons((p: Pokemon) => p.name.toUpperCase().includes(searchedName.toUpperCase())));
  }


}
