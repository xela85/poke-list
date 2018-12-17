import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from '../model/pokemon';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonApi } from '../pokemon-api.service';

@Component({
  selector: 'pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemonDetails?: PokemonDetails;

  constructor(private route: ActivatedRoute, private pokemonApi: PokemonApi) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pokemonDetails = undefined;
      this.pokemonApi.getPokemonDetails(+params.get('id')).subscribe(details => this.pokemonDetails = details);
    });

    
  }




}
